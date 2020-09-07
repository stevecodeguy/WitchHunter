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

  const setFakeAbilities = (event) => {
    event.preventDefault();
    setAbilityScore({
      strength: 5,
      agility: 2,
      toughness: 2,
      education: 4,
      reason: 2,
      will: 2,
      courage: 3,
      intuition: 2,
      personality: 2
    });
    setSpentPoints(100);
  }

  const adjustSpentPoints = async (ability, newScore, modifier) => {
    let points;
    if (modifier === 1) {
      // Points calculation if modified from base  of 2
      points = newScore !== 2 ? (newScore - 2) * 10 : 10;
    } else {
      // Points calculation if greater than 1
      points = newScore > 1 ? (newScore - 1) * -10 : -10;
    }

    // If Spent Points would not go below zero adjust. Returns will indicate to adjust the Ability Score 
    if (INITIAL_POINTS - (spentPoints + points) >= 0) {
      if (typeof (ability) === 'object' && ability !== null) {

        let scoreAdjustment = 0;
        let abilitiesString = '{';
        for (const id in ability) {
          abilitiesString = abilitiesString +
            '"' + ability[id].ability.toLowerCase() + '": ' + ability[id].score + ', ';

          scoreAdjustment += ability[id].score - 2;
        }
        abilitiesString = abilitiesString.substring(0, abilitiesString.length - 2) + '}';
        let abilitiesJSON = { ...abilityScore, ...JSON.parse(abilitiesString) };

        console.log(scoreAdjustment * - 10)
        // points = newScore > 1 ? (newScore - 1) * -10 : -10;

        await setSpentPoints(spentPoints + (scoreAdjustment * 10));
        await setAbilityScore(abilitiesJSON);
      } else {
        await setSpentPoints(spentPoints + points);
        await setAbilityScore({ ...abilityScore, [ability]: newScore });
      }
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
          await AuthAPI.post(`/characters/save_abilities`, abilityScore);
        }
      } catch (error) {
        console.log(`Error saving abilities: ${error}`);
      }
    }
  }

  useEffect(() => {
    const getAbilities = async () => {
      try {
        let categoryResults = await AuthAPI.get('/characters/abilities_category');
        for (const category in categoryResults.data.result) {
          categoryResults.data.result[category].id = parseInt(category);
        }
        setAbilitiesCategories(categoryResults.data.result);

        const abilityResults = await AuthAPI.get('/characters/abilities');
        setAbilities(abilityResults.data.result);

        const costResults = await AuthAPI.get('/characters/ability/costs');
        setGeneratingAbilities(costResults.data);

        const requirementResults = await AuthAPI.get('/characters/background_requirements');
        if (requirementResults.data !== 'Unable to get Background Requirements') {
          if (requirementResults.data.result.length > 1) {
            adjustSpentPoints(requirementResults.data.result);
          } else if (requirementResults.data.result.length === 1) {
            adjustSpentPoints(
              requirementResults.data.result[0].ability.toLowerCase(),
              requirementResults.data.result[0].score,
              1
            );
          }
        }
      } catch (error) {
        console.log(`Error getting Abilities. Error: ${error}`);
      }
    }

    getAbilities();
  }, []);

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
          <button
            onClick={(event) => {
              setFakeAbilities(event);
            }}
          >Fill</button>
          {/* TEMP BUTTON 'IGNORE' and 'FILL'. Remove later */}
        </div>
      </form>
    </>
  );
}