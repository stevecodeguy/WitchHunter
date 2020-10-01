import React from 'react';

import '../../css/characterElements.css';

export default function AbilityScore(props) {
  const handleCharacterAbilityScoresChange = (event) => {
    event.preventDefault();
    //TO DO
  }

  const handleCharacterAbilityScoresPlusMinus = async (modifier) => {
    if (modifier === -1 && ((props.abilityScore + modifier) < props.minimumScore)) return;
    if (modifier === 1 && props.abilityScore >= 5) return;
    if (modifier === 1 && props.spentPoints >= 100) return;
    await props.adjustSpentPoints(props.ability, props.abilityScore + modifier, modifier)
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