import React, { useCallback, useEffect, useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { AuthContext } from '../../../utils/context/AuthContext';
import Points from '../characterElements/Points';

import AbilityScores from '../characterElements/AbilityScore';

export default function CharacterAbilityScores() {
  const [generatingAbilities, setGeneratingAbilities] = useState(null);
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

  let history = useHistory();
  const auth = useContext(AuthContext);

  const adjustSpentPoints = async (ability, newScore, modifier) => {
    let points;
    if (modifier === 1){
      points = newScore !== 2 ? (newScore - 2) * 10 : 10;
    } else {
      points = newScore > 1 ? (newScore - 1) * -10 : -10;
    }
    // If Spent Points would not go below zero adjust. Returns will indicate to adjust the Ability Score 
    if (INITIAL_POINTS - (spentPoints + points) >= 0) {
      await setSpentPoints(spentPoints + points);
      await setAbilityScore({...abilityScore, [ability]: newScore});
      return true; 
    } else {
      return false;
    }
  }

  const abilityCosts = useCallback(() => {
    if(!!auth.jwt){
      fetch('http://localhost:3000/characters/ability/costs', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + auth.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setGeneratingAbilities(data);
      })
      .catch(error => {console.log(error)});
  } else {
    return <Redirect to="/" />
  }
  }, [auth.jwt]);

  useEffect(() => {
    abilityCosts();
  }, [abilityCosts]);

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
      
      <Points initial={INITIAL_POINTS} spentPoints={spentPoints}/>

      <form method="post">
        <div>
          <div>
            <h3>Physical Abilities</h3>
            <AbilityScores 
              ability='strength'
              abilityScore={abilityScore.strength} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
            <AbilityScores 
              ability='agility'
              abilityScore={abilityScore.agility} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
            <AbilityScores 
              ability='toughness'
              abilityScore={abilityScore.toughness} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
          </div>
          <div>
            <h3>Mental Abilities</h3>
            <AbilityScores 
              ability='education'
              abilityScore={abilityScore.education} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
            <AbilityScores 
              ability='reason'
              abilityScore={abilityScore.reason} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
            <AbilityScores 
              ability='will'
              abilityScore={abilityScore.will} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
          </div>
          <div>
            <h3>Spiritual Abilities</h3>
            <AbilityScores 
              ability='courage'
              abilityScore={abilityScore.courage} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
            <AbilityScores 
              ability='intuition'
              abilityScore={abilityScore.intuition} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
            <AbilityScores 
              ability='personality'
              abilityScore={abilityScore.personality} 
              adjustSpentPoints={(ability, newScore, modifier) => adjustSpentPoints(ability, newScore, modifier)}
            />
          </div>
          <button
            onClick={() => {
              history.push('/character/new/skills');
            }}
          >Next</button> 
        </div>
      </form>
    </>
  );
}