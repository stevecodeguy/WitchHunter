import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import AuthAPI from '../../utils/context/AuthApi';
import Points from '../components/child_components/Points';

import AbilityScores from '../components/child_components/AbilityScore';

export default function CharacterAbilityScores() {
  const [generatingAbilities, setGeneratingAbilities] = useState(null);
  const [abilities, setAbilities] = useState(null);
  const [abilitiesCategories, setAbilitiesCategories] = useState(null); //need to get id for key value pairs
  const [spentPoints, setSpentPoints] = useState(0);
  const [abilityScore, setAbilityScore] = useState({
    strength: 2,
    agility: 2,
    toughness: 2,
    education: 2,
    reason: 2,
    will: 2,
    courage: 2,
    intuition: 2,
    personality: 2
  });
  const INITIAL_POINTS = 100;

  const auth = useContext(AuthContext);
  let history = useHistory();

  const adjustSpentPoints = async (ability, newScore, modifier) => {
    let points;
    if (modifier === 1) {
      points = newScore !== 2 ? (newScore - 2) * 10 : 10;
    } else {
      points = newScore > 1 ? (newScore - 1) * -10 : -10;
    }
    // If Spent Points would not go below zero adjust. Returns will indicate to adjust the Ability Score 
    if (INITIAL_POINTS - (spentPoints + points) >= 0) {
      await setSpentPoints(spentPoints + points);
      await setAbilityScore({ ...abilityScore, [ability]: newScore });
      return true;
    } else {
      return false;
    }
  }

  const checkSpentPoints = () => {
    if (spentPoints === 100) {
      return true;
    } else {
      alert('You must spend all points before continuing!')
      return false;
    }
  }

  const saveAbilities = async () => {
    if (!!auth.state.uuid) {
      try {
        if (checkSpentPoints()) {
          console.log(abilityScore)
          await AuthAPI.post(`/characters/save_abilities`, abilityScore);
        }
      } catch (error) {
        console.log(`Error saving abilities: ${error}`);
      }
    }
  }

  useEffect(() => {
    const getAbilitiesCategories = async () => {
      try {
        let results = await AuthAPI.get('/characters/abilities_category');
        for (const category in results.data.result){
          results.data.result[category].id = parseInt(category);
        }
        setAbilitiesCategories(results.data.result);
      } catch (error) {
        console.log(`Error getting Abilities table. Error: ${error}`);
      }
    }

    const getAbilities = async () => {
      try {
        const results = await AuthAPI.get('/characters/abilities');
        setAbilities(results.data.result);
      } catch (error) {
        console.log(`Error getting Abilities table. Error: ${error}`);
      }
    }

    const getAbilityCosts = async () => {
      try {
        const results = await AuthAPI.get('/characters/ability/costs');
        setGeneratingAbilities(results.data);
      } catch (error) {
        console.log('Abilities database call error: ' + error);
      }
    }

    getAbilitiesCategories();
    getAbilities();
    getAbilityCosts();
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Ability Score</td>
            <td>Cost</td>
          </tr>
        </thead>
        <tbody>
          {
            generatingAbilities === null ?
              null :
              generatingAbilities.map(item => (
                <tr key={item.id}>
                  <td>{item.score}</td>
                  <td>{item.total_cost}</td>
                </tr>
              ))
          }
        </tbody>
      </table>

      <Points initial={INITIAL_POINTS} spentPoints={spentPoints} />

      <form method="post">
        <div>
          {
            abilitiesCategories === null ?
              null :
              abilitiesCategories.map(category => (
                <ul key={category.id}>
                  <h3>{`${category.category.charAt(0).toUpperCase() + category.category.slice(1)} Abilities`}</h3>
                  {
                    abilities === null ?
                      null :
                      abilities.map(ability => (
                        (
                          ability.category === category.category ?
                          <li key={ability.id}>
                            {
                                <AbilityScores
                                  
                                  ability={ability.ability}
                                  abilityScore={abilityScore[ability.ability]}
                                  adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
                                />
                              }
                          </li>
                          : null
                        )
                      ))
                  }
                </ul>
              ))
          }
        </div>
        <div>
          <button
            onClick={() => {
              if (checkSpentPoints()) {
                saveAbilities();
                history.push('/character/new/skills')
              }
            }}
          >Next</button>
          <button
            onClick={() => {
              history.push('/character/new/skills');
            }}
          >Ignore</button>
          {/* TEMP BUTTON 'IGNORE'. Remove later */}
        </div>
      </form>
    </>
  );
}