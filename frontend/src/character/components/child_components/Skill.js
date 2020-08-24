import React, { useState } from 'react';

import LabelName from '../../../utils/LabelName';

import '../../css/characterElements.css';

export default function Skill(props) {
  const handleCharacterSkillRankChange = (event) => { 
    props.set(parseInt(event.target.value));
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => { 
    if (modifier === -1 && props.value <= 0) return;  
    props.set(parseInt(props.value + modifier));
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input 
        type="number" 
        name={props.name}
        value={props.value} 
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