import React, { useCallback, useEffect, useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { AuthContext } from '../../../utils/context/AuthContext';
import Points from '../characterElements/Points';

import AbilityScores from '../characterElements/AbilityScore';

export default function CharacterAbilityScores() {
  const [generatingAbilities, setGeneratingAbilities] = useState(null);
  const [spentPoints, setSpentPoints] = useState({
    points: 0,
    modifier: 0
  });

  let history = useHistory();
  const auth = useContext(AuthContext);

  const adjustSpentPoints = async (newScore, modifier) => {
    let temp = newScore - 2;
    let adjustment = (temp > -1 ? ((temp * (temp + 1)) / 2) : - 1) * 10;
    await setSpentPoints({ adjustment, modifier });
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
  }, [abilityCosts])

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
      
      <Points initial={100} spentPoints={spentPoints}/>

      <form method="post">
        <div>
          <div>
            <h3>Physical Abilities</h3>
            <AbilityScores ability='strength' adjustSpentPoints={(event, modifier) => adjustSpentPoints(event, modifier)}/>
            <AbilityScores ability='agility'/>
            <AbilityScores ability='toughness'/>
          </div>
          <div>
            <h3>Mental Abilities</h3>
            <AbilityScores ability='education'/>
            <AbilityScores ability='reason'/>
            <AbilityScores ability='will'/>
          </div>
          <div>
            <h3>Spiritual Abilities</h3>
            <AbilityScores ability='courage'/>
            <AbilityScores ability='intuition'/>
            <AbilityScores ability='personality'/>
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