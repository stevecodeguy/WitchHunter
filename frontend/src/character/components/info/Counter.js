import React from 'react';

import LabelName from '../../../utils/helpers/LabelName';

import '../../css/characterElements.css';

export default function Counter({ name, labelName, info, value, set }) {
  const formatter = (
    name === 'weight' ? `${value} lbs` : `${value}`
  );

  const handleCharacterSkillRankChange = (event) => {
    event.preventDefault();
    set({ ...info, [name]: parseInt(event.target.value) });
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => {
    if ((modifier === -1 || modifier === -5) && ((value + modifier) < 0)) return;
    set(parseInt(value + modifier || 1));
  }

  const type = name === 'weight' ? "text" : "number";

  return (
    <li>
      <label htmlFor={name}><b>{LabelName(name, labelName)}</b></label>
      <input
        type={type}
        name={name}
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
      {name === 'weight' ?
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