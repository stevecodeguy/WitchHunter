import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import { CharacterContext } from '../../utils/context/CharacterContext';
import AuthAPI from '../../utils/context/AuthApi';
import Points from '../components/child_components/Points';

import AbilityScores from '../components/child_components/AbilityScore';

export default function CharacterAbilityScores() {
  const [generatingAbilities, setGeneratingAbilities] = useState(null);
  const [abilities, setAbilities] = useState(null);
  const [abilitiesCategories, setAbilitiesCategories] = useState(null);
  const [spentPoints, setSpentPoints] = useState(0);

  const INITIAL_POINTS = 100;

  const auth = useContext(AuthContext);
  const character = useContext(CharacterContext);
  let history = useHistory();

  const setFakeAbilities = (event) => {
    event.preventDefault();
    character.setAbilityScore({
      strength: { score: 5, minimum: 1 },
      agility: { score: 4, minimum: 1 },
      toughness: { score: 3, minimum: 1 },
      education: { score: 2, minimum: 1 },
      reason: { score: 2, minimum: 1 },
      will: { score: 2, minimum: 1 },
      courage: { score: 2, minimum: 1 },
      intuition: { score: 2, minimum: 1 },
      personality: { score: 2, minimum: 1 }
    });
    setSpentPoints(100);
  }

  const adjustSpentPoints = useCallback(
    // const adjustSpentPoints =
    async (ability, newScore, modifier, setMinimums = false) => {
      let points;
      if (modifier === 1) {
        // Points calculation if modified from base  of 2
        points = newScore !== 2 ? (newScore - 2) * 10 : 10;
      } else {
        // Points calculation if greater than 1
        points = newScore > 1 ? (newScore - 1) * -10 : -10;
      }

      // If Spent Points would not go below zero adjust.
      if (typeof (ability) === 'object' && ability !== null) {

        character.setAbilityScore(abilityScore => {
          let abilitiesJSON = {};
          let abilitiesCollection = {};

          for (const key in ability) {
            setMinimums ?
              abilitiesJSON = JSON.parse(`{"${ability[key].ability.toLowerCase()}": {"score": ${ability[key].score}, "minimum": ${ability[key].score}}`) :
              abilitiesJSON = JSON.parse(`{"${ability[key].ability.toLowerCase()}": {"score": ${ability[key].score}}}`);

            abilitiesCollection = { ...abilitiesCollection, ...abilitiesJSON }
          }
          return { ...character.abilityScore, ...abilitiesCollection }
        });

        setSpentPoints(spent => {
          if (INITIAL_POINTS - (spent + points) >= 0) {
            let scoreAdjustment = 0;

            for (const key in ability) {
              scoreAdjustment += ability[key].score - 2;
            }
            return spent + (scoreAdjustment * 10);
          }
          return spent;
        });
      } else {

        character.setAbilityScore(abilityScore => {
          let newAbilityScore = {};
          setMinimums ?
            newAbilityScore = { ...abilityScore, [ability]: { score: newScore, minimum: newScore } } :
            newAbilityScore = { ...abilityScore, [ability]: { score: newScore, minimum: abilityScore[ability].minimum } };
          return newAbilityScore;
        });

        setSpentPoints(spent => {
          if (INITIAL_POINTS - (spent + points) >= 0) {
            return spent + points;
          }
          return spent;
        });
      }
    }, []);


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
          for (const index in character.abilityScore) {
            character.abilityScore[index] = character.abilityScore[index].score
          }
          await AuthAPI.post(`/characters/save_abilities`, character.abilityScore);
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
            adjustSpentPoints(requirementResults.data.result, null, null, true);
          } else if (requirementResults.data.result.length === 1) {
            adjustSpentPoints(
              requirementResults.data.result[0].ability.toLowerCase(),
              requirementResults.data.result[0].score,
              1,
              true
            );
          }
        }
      } catch (error) {
        console.log(`Error getting Abilities. Error: ${error}`);
      }
    }

    getAbilities();
  }, [adjustSpentPoints]);

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
            !!generatingAbilities ?
              generatingAbilities.map(item => (
                <tr key={item.id}>
                  <td>{item.score}</td>
                  <td>{item.total_cost}</td>
                </tr>
              )) : null
          }
        </tbody>
      </table>

      <Points initial={INITIAL_POINTS} spentPoints={spentPoints} />

      <form method="post">
        <div>
          {
            !!abilitiesCategories ?
              abilitiesCategories.map(category => (
                <ul key={category.id}>
                  <h3>{`${category.category.charAt(0).toUpperCase() + category.category.slice(1)} Abilities`}</h3>
                  {
                    !!abilities ?
                      abilities.map(ability => (
                        (
                          ability.category === category.category ?
                            <li key={ability.id}>
                              {
                                <AbilityScores
                                  ability={ability.ability}
                                  abilityScore={character.abilityScore[ability.ability].score}
                                  minimumScore={character.abilityScore[ability.ability].minimum}
                                  adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
                                />
                              }
                            </li>
                            : null
                        )
                      )) : null
                  }
                </ul>
              )) : null
          }
        </div>
        <div>
          <button
            type="button"
            onClick={(event) => {
              if (checkSpentPoints()) {
                event.preventDefault();
                saveAbilities();
                history.push('/character/new/skills');
              }
            }}
          >Next</button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              history.push('/character/new/skills');
            }}
          >Ignore</button>
          <button
            type="button"
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