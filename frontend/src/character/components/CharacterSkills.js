import React from 'react';

import Counter from '../components/child_components/Counter';

export default function CharacterAbilityScores() {
  return (
    <form method="post">

      <div>
        <div>
          <h5>Fighting Counters</h5>
          <Counter name='archery' ability='agility'/>
          <Counter name='firearms' ability='agility'/>
          <Counter name='grapple' ability='strength'/>
          <Counter name='hand to hand' ability='strength'/>
          <Counter name='throw' ability='strength'/>
        </div>
        <div>
          <h5>Interaction Counters</h5>
          <Counter name='charm' ability='personality'/>
          <Counter name='command' ability='courage'/>
          <Counter name='deceive' ability='personality'/>
          <Counter name='empathy' ability='intuition'/>
          <Counter name='intimidate' ability='personality'/>
          <Counter name='pantomime' ability='personality'/>
        </div>
        <div>
          <h5>Movement Counters</h5>
          <Counter name='acrobatics' ability='agility'/>
          <Counter name='climb' ability='strength'/>
          <Counter name='contortionist' ability='agility'/>
          <Counter name='drive' ability='agility'/>
          <Counter name='jump' ability='strength'/>
          <Counter name='ride' ability='agility'/>
          <Counter name='row' ability='strength'/>
          <Counter name='stealth' ability='agility'/>
          <Counter name='swim' ability='strength'/>
        </div>
        <div>
          <h5>Reaction Counters</h5>
          <Counter name='balance' ability='agility'/>
          <Counter name='concentrate' ability='strength'/>
          <Counter name='contortionist' ability='agility'/>
          <Counter name='drive' ability='agility'/>
          <Counter name='jump' ability='strength'/>
          <Counter name='ride' ability='agility'/>
          <Counter name='row' ability='strength'/>
          <Counter name='stealth' ability='agility'/>
          <Counter name='swim' ability='strength'/>
        </div>

      </div>
    </form>
  );
}