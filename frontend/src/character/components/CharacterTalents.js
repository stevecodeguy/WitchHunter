import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';

import '../css/characterTalents.css';

import Talents from '../components/child_components/Talents';
import TalentsSelected from '../components/child_components/TalentsSelected';
import TalentsUnavailable from '../components/child_components/TalentsUnavailable';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';
import { CharacterContext } from '../../utils/context/CharacterContext';

export default function CharacterTalents() {
  const [talentList, setTalentList] = useState([]);
  const [talentRequirements, setTalentRequirements] = useState([]);
  const [selected, setSelected] = useState({ basic: 0, greater: 0, sum: 0 });

  const auth = useContext(AuthContext);
  const {
    abilityScore,
    skills,
    talents,
    setTalents
  } = useContext(CharacterContext);

  let history = useHistory();

  const addTalent = (id) => {
    const selectedTalent = talentList.find(talent => talent.id === id);

    if (selectedTalent.category === 'basic' && selected.sum >= 4) return;
    if (selectedTalent.category === 'greater' && selected.sum >= 3) return;
    if (talents.find(t => t.id === selectedTalent.id)) return;

    if (selectedTalent.category === 'basic') {
      setSelected(currentSelected => {
        return {
          ...currentSelected,
          basic: currentSelected.basic + 1,
          sum: currentSelected.sum + 1
        }
      });
    } else if (selectedTalent.category === 'greater') {
      setSelected(currentSelected => {
        return {
          ...currentSelected,
          greater: currentSelected.greater + 1,
          sum: currentSelected.sum + 2
        }
      });
    }

    setTalents(currentTalents => {
      return [...currentTalents, selectedTalent];
    });

    setTalentList(currentList => {
      const hiddenId = currentList.findIndex(talent => id === talent.id);
      currentList[hiddenId] = { ...selectedTalent, hide: true };
      return [...currentList];
    });
  }

  const removeTalent = (id) => {
    const removedTalentId = talentList.findIndex(talent => talent.id === id);
    const removedTalent = talentList.find(talent => talent.id === id);

    setTalents(currentTalents => {
      const deleteTalent = currentTalents.findIndex(curTalent => curTalent.id === id);
      currentTalents.splice(deleteTalent, 1);
      return [...currentTalents];
    });

    setTalentList(currentList => {
      const tempList = currentList;
      delete tempList[removedTalentId].hide;
      return [...tempList];
    });

    setSelected(currentSelected => {
      let basicAdjust = currentSelected.basic;
      let greaterAdjust = currentSelected.greater;
      let sumAdjust = currentSelected.sum;

      if (removedTalent.category === "basic") {
        basicAdjust -= 1;
        sumAdjust -= 1;
      } else if (removedTalent.category === "greater") {
        greaterAdjust -= 1;
        sumAdjust -= 2;
      }
      return {
        ...currentSelected,
        basic: basicAdjust,
        greater: greaterAdjust,
        sum: sumAdjust
      }
    });
  }

  // Axios calls to get starting data
  useEffect(() => {
    const getTalents = async () => {
      const talentsData = await AuthAPI.get('/characters/talents');
      let tData = talentsData.data.result;

      for (const key in tData) {
        tData[key] = {
          ...tData[key],
          requirementsFail: false,
          hide: false
        }
      }
      setTalentList(tData);

      const talentRequirementsData = await AuthAPI.get('/characters/talent_requirements');
      setTalentRequirements(talentRequirementsData.data.result);
    }
    getTalents();
  }, [setTalents]);

  // Check if the Skill score is high enough for Talent
  const checkSkill = useCallback((skill, score, requirementsFail) => {
    if (!requirementsFail) return false;
    const result = skills.find(s => s.skill === skill || 0);
    return result.score < score;
  }, [skills]);

  // Check if the Ability score is high enough for Talent
  const checkAbility = useCallback((ability, score, requirementsFail) => {
    if (!requirementsFail) return false;
    for (const key in abilityScore) {
      if (key === ability.toLowerCase()) {
        const result = abilityScore[key].score < score;
        return result;
      }
    }
  }, [abilityScore]);

  // Check if the pre-requisite Talent exsists for Talent
  const checkTalent = useCallback((talent, requirementsFail) => {
    if (!requirementsFail) return false;
    for (const key in talents) {
      if (talents[key].talent === talent) {
        return false;
      }
    }
    return true;
  }, [talents]);

  // UseEffect to check Talent requirements
  useEffect(() => {
    setTalentList(currentTalents => {
      const newTalents = [...currentTalents];

      if (talentRequirements.length > 0) {
        for (const index in talentRequirements) {
          const talentListCurrentIndex = newTalents.findIndex(tl => tl.id === talentRequirements[index].fk_talent_id);
          let requirementsFail = newTalents[talentListCurrentIndex].requirementsFail || true;

          if (newTalents.find(tl => tl.id === talentRequirements[index].fk_talent_id)) {

            if (talentRequirements[index].requirement_type === 'talent') requirementsFail = checkTalent(talentRequirements[index].requirement, requirementsFail );

            newTalents[talentListCurrentIndex] = {
              ...newTalents[talentListCurrentIndex],
              requirementsFail
            }

            console.log('index ', newTalents.findIndex(tl => tl.id === talentRequirements[index].fk_talent_id), 
            'find ', newTalents.find(tl => tl.id === talentRequirements[index].fk_talent_id),
            'reqType ', talentRequirements[index].requirement_type
            )
          }
        }
      }
      // console.log(newTalents)
      return newTalents;
    });
  }, [talents, talentRequirements, checkTalent, setTalentList]);

  // UseEffect to check Ability and Skill requirements
  useEffect(() => {

    // Add Talent Requirements to Talent List
    setTalentList(currentTalents => {
      const newTalents = [...currentTalents];

      if (talentRequirements.length > 0) {

        for (const index in talentRequirements) {
          const talentListCurrentIndex = newTalents.findIndex(tl => tl.id === talentRequirements[index].fk_talent_id);

          if (newTalents.find(tl => tl.id === talentRequirements[index].fk_talent_id)) {
            let requirementsFail = true;

            if (talentRequirements[index].requirement_type === 'skill') requirementsFail = checkSkill(talentRequirements[index].requirement, talentRequirements[index].score, requirementsFail);

            if (talentRequirements[index].requirement_type === 'ability') requirementsFail = checkAbility(talentRequirements[index].requirement, talentRequirements[index].score, requirementsFail);

            // if (talentRequirements[index].requirement_type === 'spirit') requirementsFail = true;

            newTalents[talentListCurrentIndex] = {
              ...newTalents[talentListCurrentIndex],
              requirementsFail,
              requirements:
                !!newTalents[talentListCurrentIndex].requirements && newTalents[talentListCurrentIndex].requirements.length >= 1 ?
                  [...newTalents[talentListCurrentIndex].requirements, { ...talentRequirements[index] }] :
                  [{ ...talentRequirements[index] }]
            }

            console.log('index ', newTalents.findIndex(tl => tl.id === talentRequirements[index].fk_talent_id), 
            'find ', newTalents.find(tl => tl.id === talentRequirements[index].fk_talent_id),
            'reqType ', talentRequirements[index].requirement_type
            )
          }
        }
      }
      return newTalents;
    });
  }, [
    talentRequirements,
    checkAbility,
    checkSkill
  ]);

  useEffect(() => { console.log(talentList) }, [talentList])

  return (
    <>
      <h1>Talents</h1>
      <p>Select either 2 Basic talents and a Greater Talent <b>-or-</b> 4 Basic talents.</p>
      <div>
        <h2>Selected Talents</h2>
        <div>
          <h6>Basic: {selected.basic}</h6>
          <h6>Greater: {selected.greater}</h6>
        </div>
        <ul className='talentCard'>
          {talents.length > 0 ? talents.map(talent => (
            <li key={talent.id + 'selected'}>
              <TalentsSelected
                id={talent.id}
                talent={talent.talent}
                benefit={talent.benefit}
                category={talent.category}
                removeTalent={removeTalent}
              />
            </li>
          )) : null}
        </ul>
      </div>

      <h2>Talent List</h2>
      <ul className='talentCard'>
        {talentList.length > 0 ? talentList.map(talent => (
          !talent.hide && !talent.requirementsFail && talent.category !== 'heroic' ?
            <li key={talent.id + 'list'}>
              <Talents
                id={talent.id}
                talent={talent.talent}
                benefit={talent.benefit}
                category={talent.category}
                addTalent={addTalent}
              />
            </li> : null
        )) : null}
      </ul>

      <h2>Unavailable Talents</h2>
      <ul className='talentCard'>
        {talentList.length > 0 ? talentList.map(talent => (
          talent.requirementsFail && !!talent.requirements && talent.requirements.length > 0 && talent.category !== 'heroic' ?
            <li key={talent.id + 'failed'}>
              <TalentsUnavailable
                id={talent.id}
                talent={talent.talent}
                benefit={talent.benefit}
                category={talent.category}
                requirements={talent.requirements}
                option={talent.option}
              />
            </li> : null
        )) : null}
      </ul>
    </>
  );
}