import React, { useState } from 'react';

import './characterElements.css';

export default function Skill(props) {
  const [skillRank, setSkillRank] = useState(0);

  const handleCharacterSkillRankChange = (event) => { 
    setSkillRank(parseInt(event.target.value));
  }

  const handleCharacterSkillRankPlusMinus = (modifier) => { 
    if (modifier === -1 && skillRank <= 0) return  
    setSkillRank(skillRank + modifier);
  }

  return (
    <>
      <label htmlFor={props.name}>
        <b>{props.name.split(' ').map((str) => str.charAt(0).toUpperCase() + str.substr(1)).join(' ') + ' (' + props.ability.substr(0, 3).toUpperCase() + ') '}</b>
      </label>
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
    </>
  );
}