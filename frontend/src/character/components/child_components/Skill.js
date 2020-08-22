import React, { useState } from 'react';

import LabelName from '../../../utils/LabelName';

import '../../css/characterElements.css';

export default function Skill(props) {
  const [skillRank, setSkillRank] = useState(0);

  const handleCharacterSkillRankChange = (event) => { 
    setSkillRank(parseInt(event.target.value));
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => { 
    if (modifier === -1 && skillRank <= 0) return;  
    setSkillRank(skillRank + modifier);
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input 
        type="number" 
        name={props.name}
        value={skillRank} 
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