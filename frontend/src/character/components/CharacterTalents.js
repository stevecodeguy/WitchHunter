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

  const auth = useContext(AuthContext);
  const {
    abilities,
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
// May need to set temp list before updating.
    setTalentList(currentList => {
      currentList[selectedTalent.id - 1] = {...selectedTalent, hide: true};
      return currentList;
    });
  }

  const removeTalent = (id) => {
    const removedTalent = talentList.find(talent => talent.id === id);
    console.log('here ', removedTalent)
    
    setTalentList(currentList => {
      currentList[removedTalent.id - 1] = {...removedTalent, hide: false};
      return currentList;
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
          !talent.hide ?
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