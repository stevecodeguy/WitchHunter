import React from 'react';

import LabelName from '../../../utils/LabelName';

import '../../css/characterElements.css';

export default function Skill(props) {
  const handleCharacterSkillRankChange = (event) => {
    event.preventDefault();
    props.set({adjustment: parseInt(event.target.value), name: props.name, category: props.category});
  }
  
  const handleCharacterSkillRankPlusMinus = (modifier) => {
    if (modifier === -1 && (props.value + modifier) < 0) return;
    props.set({adjustment: parseInt(modifier), name: props.name, category: props.category});
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input
        type="number"
        name={props.name}
        value={props.value}
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
    </li>
  );
}