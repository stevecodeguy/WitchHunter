import React, { useState } from 'react';

import '../../css/characterElements.css';

export default function AbilityScore(props) {
  const [abilityScore, setAbilityScore] = useState(props.abilityScore);

  const handleCharacterAbilityScoresChange = (event) => { 
    event.preventDefault();
    setAbilityScore(event.target.value);
  }

  const handleCharacterAbilityScoresPlusMinus = async (modifier) => { 
    if (modifier === -1 && props.abilityScore <= 1) return;
    if (modifier === 1 && props.abilityScore >= 5) return;
    if (await props.adjustSpentPoints(props.ability, props.abilityScore + modifier, modifier)) {
      // If Spent Points would not go below zero, increase Ability Score
      await setAbilityScore(props.abilityScore + modifier);
    };
  }

  return (
    <>
      <label htmlFor={props.ability}>
        <b>{props.ability.charAt(0).toUpperCase() + props.ability.slice(1)}</b>
      </label>
      <input 
        type="number" 
        name={props.ability}
        value={props.abilityScore} 
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