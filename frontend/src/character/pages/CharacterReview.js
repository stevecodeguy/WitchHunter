import React from 'react';

import Info from '../components/review/Info';
import Abilities from '../components/review/Abilities';
import Skills from '../components/review/Skills';
import CombatAbilities from '../components/review/CombatAbilities';

import '../css/characterReview.css';

export default function CharacterReview() {

  return (
    <>
      <h5 className="no-print">Character Review</h5>
      <div id="review">
        <div className="print-box">
          <Info />
          <Abilities />
          <Skills />
          <hr />
        </div>
        <div className="side-by-side combat-abilities page-break print-box">
          <CombatAbilities />
        </div>
      </div>
    </>
  );
}