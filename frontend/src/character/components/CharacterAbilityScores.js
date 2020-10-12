import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';
import { CharacterContext } from '../../utils/context/CharacterContext';
import AuthAPI from '../../utils/context/AuthApi';
import Points from '../components/child_components/Points';

import AbilityScores from '../components/child_components/AbilityScore';

export default function CharacterAbilityScores() {
  const [generatingAbilities, setGeneratingAbilities] = useState('');
  const [abilities, setAbilities] = useState('');
  const [abilitiesCategories, setAbilitiesCategories] = useState('');

  const INITIAL_POINTS = 100;

  const auth = useContext(AuthContext);
  const {
    abilityScore,
    setAbilityScore,
    spentSkillPoints,
    setSpentSkillPoints
  } = useContext(CharacterContext);
  let history = useHistory();

  const setFakeAbilities = (event) => {
    event.preventDefault();
    setAbilityScore({
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
    setSpentSkillPoints(100);
  }

  const adjustSpentPoints = useCallback((ability, newScore, modifier, setMinimums = false) => {
    let points = 0;
    if (modifier === 1) {
      // Points calculation if modified from base of 2
      points = newScore !== 2 ? (newScore - 2) * 10 : 10;
    } else if (modifier === -1) {
      // Points calculation if greater than 1
      points = newScore > 1 ? (newScore - 1) * -10 : -10;
    }

    // Adjust with complete overwrite (Object) or individual ability adjustment.
    if (typeof (ability) === 'object' && ability !== null) {

      setAbilityScore(abilityScore => {
        let abilitiesJSON = {};
        let abilitiesCollection = {};

        for (const key in ability) {
          setMinimums ?
            abilitiesJSON = JSON.parse(`{"${ability[key].ability.toLowerCase()}": {"score": ${ability[key].score}, "minimum": ${ability[key].score}}`) :
            abilitiesJSON = JSON.parse(`{"${ability[key].ability.toLowerCase()}": {"score": ${ability[key].score}}}`);

          abilitiesCollection = { ...abilitiesCollection, ...abilitiesJSON }
        }
        return { ...abilityScore, ...abilitiesCollection }
      });

      setSpentSkillPoints(spent => {
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

      setAbilityScore(abilityScore => {
        let newAbilityScore = {};
        setMinimums ?
          newAbilityScore = { ...abilityScore, [ability]: { score: newScore * 1, minimum: newScore } } :
          newAbilityScore = { ...abilityScore, [ability]: { score: newScore * 1, minimum: abilityScore[ability].minimum } };
        return newAbilityScore;
      });

      setSpentSkillPoints(spent => {
        if (INITIAL_POINTS - (spent + points) >= 0) {
          return spent + points;
        }
        return spent;
      });
    }
  }, [setAbilityScore, setSpentSkillPoints]);

  const checkSpentPoints = () => {
    if (spentSkillPoints === 100) {
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
          localStorage.setItem('character_abilities', JSON.stringify(abilityScore));
          localStorage.setItem('character_abilities_spent', spentSkillPoints);
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
            adjustSpentPoints(requirementResults.data.result, null, null, true);
          } else if (requirementResults.data.result.length === 1) {
            //(ability, newScore, modifier, setMinimums = false)

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

      <Points initial={INITIAL_POINTS} spentPoints={spentSkillPoints} />

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
                                  abilityScore={abilityScore[ability.ability].score}
                                  minimumScore={abilityScore[ability.ability].minimum}
                                  spentPoints={spentSkillPoints}
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
            onClick={() => {
              if (checkSpentPoints()) {
                saveAbilities();
                history.push('/character/new/skills');
              }
            }}
          >Next</button>
          <button
            type="button"
            onClick={() => {
              history.push('/character/new/info');
            }}
          >Back to Character Info</button>
          <button
            type="button"
            onClick={(event) => {
              setFakeAbilities(event);
            }}
          >Fill</button>
          {/* TEMP BUTTON 'FILL'. Remove later */}
        </div>
      </form>
    </>
  );
}