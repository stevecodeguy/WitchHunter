import React from 'react';

import LabelName from '../../../utils/helpers/LabelName';

import '../../css/characterElements.css';

export default function Counter(props) {
  const handleCharacterHeightFeetChange = (event) => {
    event.preventDefault();
    if ((event.target.value) === '') {
      props.setFt('');
    } else {
      props.setFt((parseInt(event.target.value)).toString());
    }
  }

  const handleCharacterHeightInchesChange = (event) => {
    event.preventDefault();
    if ((event.target.value) < 12) {
      if ((event.target.value) === '') {
        props.setIn('');
      } else {
        props.setIn((parseInt((event.target.value) % 12)).toString());
      }
    }
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => {
    const currentInchValue = parseInt(props.valueIn === '' ? 0 : props.valueIn);
    const currentFeetValue = parseInt(props.valueFt === '' ? 0 : props.valueFt);
    const inchResult = 12 + (currentInchValue + modifier);

    if (Math.trunc((currentInchValue + modifier) / 12) >= 1) {
      props.setFt((currentFeetValue + 1).toString());
    }

    if ((modifier === -1 || modifier === -5) && (currentInchValue + modifier) < 0) {
      if (currentFeetValue > 0) {
        props.setFt((currentFeetValue - 1).toString());
        inchResult < 0 ? props.setIn('') : props.setIn(inchResult.toString());
      } else {
        props.setIn(inchResult.toString());
      }
    } else {
      props.setIn(((currentInchValue + modifier) % 12).toString());
    }
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input
        type="number"
        name={props.name}
        value={props.valueFt}
        onChange={(event) => handleCharacterHeightFeetChange(event)}
        required />
      <input
        type="number"
        value={props.valueIn}
        onChange={(event) => handleCharacterHeightInchesChange(event)}
        required />
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(1)}
        type='button'
      >+</button>
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(-1)}
        type='button'
      >-</button>
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(5)}
        type='button'
      >+5</button>
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(-5)}
        type='button'
      >-5</button>
    </li>
  );
}