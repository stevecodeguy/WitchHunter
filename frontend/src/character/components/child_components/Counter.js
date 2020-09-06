import React from 'react';

import LabelName from '../../../utils/LabelName';

import '../../css/characterElements.css';

export default function Counter(props) {
  const formatter = (
    props.name === 'weight' ? `${props.value} lbs` : `${props.value}`
  );

  const handleCharacterSkillRankChange = (event) => {
    event.preventDefault();
    props.set(parseInt(event.target.value));
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => {
    if ((modifier === -1 || modifier === -5) && ((props.value + modifier) < 0)) return;
    props.set(parseInt(props.value + modifier || 1));
  }

  const type = props.name === 'weight' ? "text" : "number";

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input
        type={type}
        name={props.name}
        value={formatter}
        onChange={(event) => handleCharacterSkillRankChange(event)}
        required />
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(1)}
        type='button'
      >+</button>
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(-1)}
        type='button'
      >-</button>
      {props.name === 'weight' ?
        <>
          <button
            onClick={() => handleCharacterSkillRankPlusMinus(5)}
            type='button'
          >+5</button>
          <button
            onClick={() => handleCharacterSkillRankPlusMinus(-5)}
            type='button'
          >-5</button>
        </>
        : null}
    </li>
  );
}