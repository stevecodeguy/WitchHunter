import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Talents from '../components/child_components/Talents';
import TalentsSelected from '../components/child_components/TalentsSelected';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';
import { CharacterContext } from '../../utils/context/CharacterContext';

export default function CharacterTalents() {
  const [talentList, setTalentList] = useState([]);
  const [talentRequirements, setTalentRequirements] = useState([]);
  const [selected, setSelected] = useState({ basic: 0, greater: 0, sum: 0 });
  const [availabiltySet, setAvailabilitySet] = useState(false);

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
      return [ ...tempList ];
    });

    setSelected(currentSelected => {
      let basicAdjust = currentSelected.basic;
      let greaterAdjust = currentSelected.greater;
      let sumAdjust = currentSelected.sum;

      if (removedTalent.category === "basic") {
        basicAdjust -= 1;
        sumAdjust -= 1;
      } else if (removedTalent.category === "greater"){
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

  useEffect(() => {
    const getTalents = async () => {
      const talentsData = await AuthAPI.get('/characters/talents');
      setTalentList(talentsData.data.result);

      const talentRequirementsData = await AuthAPI.get('/characters/talent_requirements');
      setTalentRequirements(talentRequirementsData.data.result);
    }

    getTalents();
  }, [setTalents]);

  useEffect(() => {
    if(talentList.length > 0 && talentRequirements.length > 0 && !availabiltySet){
      const abilityObj = Object.entries(abilityScore);

      for(const index in talentList){
        if (talentRequirements.find(tr => talentList[index].id === tr.id)){
          const trIndex = talentRequirements.findIndex(tr => talentList[index].id === tr.id);

          if (talentRequirements[trIndex].requirement_type === 'skill'){
            const checkScore = skills.find(s => s.skill === talentRequirements[trIndex].requirement);
            
            if (checkScore.score < talentRequirements[trIndex].score){
              talentList[index] = {
                ...talentList[index], 
                failedRequirements: true
              }
            } 
          }

          if (talentRequirements[trIndex].requirement_type === 'ability'){
            const checkAbility = abilityObj.find(aScore => aScore[0] === talentRequirements[trIndex].requirement.toLowerCase());

            if (checkAbility[1].score < talentRequirements[trIndex].score){
              talentList[index] = {
                ...talentList[index], 
                failedRequirements: true
              }
            } 
          }
        }
      }
      setAvailabilitySet(true);
    }

  }, [abilityScore, skills, talentList, talentRequirements, availabiltySet, setAvailabilitySet])

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
        <ul>
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
      <ul>
        {talentList.length > 0 ? talentList.map(talent => (
          !talent.hide && !talent.failedRequirements?
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
    </>
  );
}