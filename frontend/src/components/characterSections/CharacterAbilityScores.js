import React from 'react';

import AbilityScores from '../characterElements/AbilityScore';

export default function CharacterAbilityScores() {
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

      </div>
    </form>
  );
}