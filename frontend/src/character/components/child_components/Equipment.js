import React from 'react';

// import LabelName from '../../../utils/LabelName';

// import '../../css/characterElements.css';

export default function Equipment(props) {
  const handleCharacterSkillRankChange = (event) => {
    event.preventDefault();
    
    if (event.key !== event.target.value){
      props.set({adjustment: parseInt(event.key), name: props.name, category: props.category, overwrite: true});
    }
  }
  
  const handleCharacterSkillRankPlusMinus = (modifier) => {
    if (modifier === -1 && (props.value + modifier) < 0) return;
    props.set({adjustment: parseInt(modifier), name: props.name, category: props.category, overwrite: false});
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b>  {props.ability !== "-" ? `(${props.ability}: ${props.max} Max)` : null}</label>
      <input
        type="number"
        name={props.name}
        value={props.value}
        onChange={(event) => handleCharacterSkillRankChange(event)}
        onKeyPress={(event) => handleCharacterSkillRankChange(event)}
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