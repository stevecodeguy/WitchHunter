import React from 'react';

import LabelName from '../../../utils/helpers/LabelName';

export default function TextEntry(props) {
  const handleCharacterTextChange = (event) => {
    event.preventDefault();
    props.set(event.target.value);
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input 
        type="text" 
        name={props.name} 
        value={props.value}
        onChange={handleCharacterTextChange}
        required />
    </li>
  );
}