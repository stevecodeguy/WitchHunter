import React from 'react';

import Info from '../components/review/Info';
import Abilities from '../components/review/Abilities';
import Skills from '../components/review/Skills';

import '../css/characterReview.css';

export default function CharacterReview() {
 
  return (
    <>
      <h5>Character Review</h5>
      <div id="review">
        <Info />
        <Abilities />
        <Skills />
      </div>
    </>
  );
}