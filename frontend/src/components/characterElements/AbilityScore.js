import React, { useState } from 'react';

import './characterElements.css';

export default function AbilityScore(props) {
  const [abilityScore, setAbilityScore] = useState(0);

  const handleCharacterAbilityScoresChange = (event) => { 
    setAbilityScore(event.target.value);
  }

  const handleCharacterAbilityScoresPlusMinus = (modifier) => { 
    if (modifier === -1 && abilityScore <= 0) return  
    setAbilityScore(abilityScore + modifier);
  }

  return (
    <>
      <label htmlFor={props.ability}>
        <b>{props.ability.charAt(0).toUpperCase() + props.ability.slice(1)}</b>
      </label>
      <input 
        type="number" 
        name={props.ability}
        value={abilityScore} 
        onChange={handleCharacterAbilityScoresChange}
        required />
      <button 
        onClick={() => handleCharacterAbilityScoresPlusMinus(1)}
        type='button'
      >+</button>
      <button 
        onClick={() => handleCharacterAbilityScoresPlusMinus(-1)}
        type='button'
      >-</button>
    </>
  );
}