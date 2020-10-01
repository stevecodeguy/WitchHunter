import React from 'react';

import '../../css/characterElements.css';

export default function AbilityScore(props) {
  const handleCharacterAbilityScoresChange = (event) => {
    event.preventDefault();
    if (event.key >= 0 && event.key <= 5 && (event.key !== event.target.value)) {
      // const increaseOrDecrease = event.key >= event.target.value ? 1 : -1;
      // let sumArr = [];
      // let arr = [event.target.value, event.key];
      // arr.sort((a, b) => a -b);

      // console.log(arr)
      // for (let i = arr[0] - arr[0]; i <= arr[1] - arr[0]; i++){
      //   if (arr[0] * 1 === 1) sumArr.push(-1);
      //   sumArr.push(i);
      // }
      // let sum = sumArr.reduce((accumulator, currentValue) => {return (accumulator * 1) + (currentValue * 1)}, 0) * 10;
      // console.log('sum', sum, arr);

      let scores = {"oldValue":event.target.value, "newValue": event.key};

      props.adjustSpentPoints(props.ability, scores, 0);
      event.target.value = event.key;
    }
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