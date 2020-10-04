import React from 'react';

import '../../css/characterElements.css';

export default function AbilityScore(props) {
  const handleCharacterAbilityScoresChange = (event) => {
    event.preventDefault();
    if (event.key >= 0 && event.key <= 5 && (event.key !== event.target.value)) {

      let lowScore;
      let highScore;
      let modifier;
      if(event.key > event.target.value){
        lowScore = event.target.value;
        highScore = event.key;
        modifier = 1;
      } else {
        lowScore = event.key;
        highScore = event.target.value;
        modifier = -1;
      }
      
      for (let i = 1; i <= (highScore - lowScore); i++){
        if (modifier === -1 && ((props.abilityScore + modifier) < props.minimumScore)) return;
        if (modifier === 1 && props.abilityScore >= 5) return;
        if (modifier === 1 && props.spentPoints >= 100) return;

        props.adjustSpentPoints(props.ability, props.abilityScore + (i * modifier), modifier);
        event.target.value = i;
      }

    }
  }

  const handleCharacterAbilityScoresPlusMinus = async (modifier) => {
    if (modifier === -1 && ((props.abilityScore + modifier) < props.minimumScore)) return;
    if (modifier === 1 && props.abilityScore >= 5) return;
    if (modifier === 1 && props.spentPoints >= 100) return;
    
    await props.adjustSpentPoints(props.ability, props.abilityScore + modifier, modifier);
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
        onKeyPress={handleCharacterAbilityScoresChange}
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