import React from 'react';

import Skill from '../characterElements/Skill';

export default function CharacterAbilityScores() {
  return (
    <form method="post">

      <div>
        <div>
          <h5>Fighting Skills</h5>
          <Skill name='archery' ability='agility'/>
          <Skill name='firearms' ability='agility'/>
          <Skill name='grapple' ability='strength'/>
          <Skill name='hand to hand' ability='strength'/>
          <Skill name='throw' ability='strength'/>
        </div>
        <div>
          <h5>Interaction Skills</h5>
          <Skill name='charm' ability='personality'/>
          <Skill name='command' ability='courage'/>
          <Skill name='deceive' ability='personality'/>
          <Skill name='empathy' ability='intuition'/>
          <Skill name='intimidate' ability='personality'/>
          <Skill name='pantomime' ability='personality'/>
        </div>
        <div>
          <h5>Movement Skills</h5>
          <Skill name='acrobatics' ability='agility'/>
          <Skill name='climb' ability='strength'/>
          <Skill name='contortionist' ability='agility'/>
          <Skill name='drive' ability='agility'/>
          <Skill name='jump' ability='strength'/>
          <Skill name='ride' ability='agility'/>
          <Skill name='row' ability='strength'/>
          <Skill name='stealth' ability='agility'/>
          <Skill name='swim' ability='strength'/>
        </div>
        <div>
          <h5>Reaction Skills</h5>
          <Skill name='balance' ability='agility'/>
          <Skill name='concentrate' ability='strength'/>
          <Skill name='contortionist' ability='agility'/>
          <Skill name='drive' ability='agility'/>
          <Skill name='jump' ability='strength'/>
          <Skill name='ride' ability='agility'/>
          <Skill name='row' ability='strength'/>
          <Skill name='stealth' ability='agility'/>
          <Skill name='swim' ability='strength'/>
        </div>

      </div>
    </form>
  );
}