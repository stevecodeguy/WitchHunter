import React from 'react';

import LabelName from '../../../utils/LabelName';

import '../../css/characterElements.css';

export default function Counter(props) {

  const handleCharacterSkillRankChange = (event) => {
    props.set(parseInt(event.target.value));
  }


  const handleCharacterSkillRankPlusMinus = (modifier) => {
    if (modifier === -1 && props.value <= 0) return;
    props.set(parseInt(props.value + modifier));
  }

  const formatter = (
    props.name === 'weight' ?
      `${props.value} lbs` :
      props.name === 'height' ?
        `${Math.trunc(props.value / 12)}'${props.value % 12}\u0022` :
        props.value
  );

  const type = props.name === 'height' || props.name === 'weight' ? "text" : "number";

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input
        type={type}
        name={props.name}
        value={formatter}
        onChange={handleCharacterSkillRankChange}
        required />
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(1)}
        type='button'
      >+</button>
      <button
        onClick={() => handleCharacterSkillRankPlusMinus(-1)}
        type='button'
      >-</button>
    </li>
  );
}