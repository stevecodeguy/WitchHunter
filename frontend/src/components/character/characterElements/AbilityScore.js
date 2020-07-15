import React, { useState } from 'react';

import './characterElements.css';

export default function AbilityScore(props) {
  const [abilityScore, setAbilityScore] = useState(2);

  const handleCharacterAbilityScoresChange = (event) => { 
    setAbilityScore(event.target.value);
  }

  const handleCharacterAbilityScoresPlusMinus = async (modifier) => { 
    if (modifier === -1 && abilityScore <= 1) return;
    if (modifier === 1 && abilityScore >= 5) return;
     const newScore = await abilityScore + modifier;
    setAbilityScore(newScore);
    return props.adjustSpentPoints(newScore, modifier); // Returns the amount of points spent to buy
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