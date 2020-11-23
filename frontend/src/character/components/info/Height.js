import React from 'react';

import LabelName from '../../../utils/helpers/LabelName';

import '../../css/characterElements.css';

export default function Counter({info, name, labelName, valueIn, valueFt, set}) {
  const handleCharacterHeightFeetChange = (event) => {
    event.preventDefault();
    if ((event.target.value) === '') {
      set({...info, heightFeet: ''})
    } else {
      set({...info, heightFeet: (parseInt(event.target.value)).toString()})
    }
  }

  const handleCharacterHeightInchesChange = (event) => {
    event.preventDefault();
    if ((event.target.value) < 12) {
      if ((event.target.value) === '') {
        set({...info, heightIn: ''})
      } else {
        set({...info, heightIn: (parseInt((event.target.value) % 12)).toString()})
      }
    }
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => {
    const currentInchValue = parseInt(valueIn === '' ? 0 : valueIn);
    const currentFeetValue = parseInt(valueFt === '' ? 0 : valueFt);
    const inchResult = 12 + (currentInchValue + modifier);

    if (Math.trunc((currentInchValue + modifier) / 12) >= 1) {
      set({...info, heightFeet: (currentFeetValue + 1).toString()})
    }

    if ((modifier === -1 || modifier === -5) && (currentInchValue + modifier) < 0) {
      if (currentFeetValue > 0) {
        let inches = inchResult < 0 ? '' : inchResult.toString();
        set({...info, heightFeet: (currentFeetValue - 1).toString(), heightIn: inches});
      } else {
        set({...info, heightIn: inchResult.toString()});
      }
    } else {
      set({...info, heightIn: ((currentInchValue + modifier) % 12).toString()});
    }
  }

  return (
    <li>
      <label htmlFor={name}><b>{LabelName(name, labelName)}</b></label>
      <input
        type="number"
        name={name}
        value={valueFt}
        onChange={(event) => handleCharacterHeightFeetChange(event)}
        required />
      <input
        type="number"
        value={valueIn}
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