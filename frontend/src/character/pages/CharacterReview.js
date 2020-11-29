import React from 'react';

import Info from '../components/review/Info';
import Abilities from '../components/review/Abilities';
import Skills from '../components/review/Skills';
import CombatAbilities from '../components/review/CombatAbilities';

import '../css/characterReview.css';

export default function CharacterReview() {
 
  return (
    <>
      <h5>Character Review</h5>
      <div id="review">
        <Info />
        <Abilities />
        <Skills />
        <hr />
        <div className="side-by-side combat-abilities">
          <CombatAbilities />
        </div>
      </div>
    </>
  );
}