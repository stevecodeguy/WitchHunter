import React from 'react';
import { useHistory } from 'react-router-dom';

import AbilityScores from '../characterElements/AbilityScore';

export default function CharacterAbilityScores() {
  let history = useHistory();

  return (
    <form method="post">

      <div>
        <div>
          <h3>Physical Abilities</h3>
          <AbilityScores ability='strength'/>
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
  );
}