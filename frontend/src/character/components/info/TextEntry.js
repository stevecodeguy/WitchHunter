import React from 'react';

import LabelName from '../../../utils/helpers/LabelName';

export default function TextEntry({info, name, labelName, value, set}) {
  const handleCharacterTextChange = (event) => {
    event.preventDefault();
    set({...info, [name]: event.target.value});
  }

  return (
    <li>
      <label htmlFor={name}><b>{LabelName(name, labelName)}</b></label>
      <input 
        type="text" 
        name={name} 
        value={value}
        onChange={handleCharacterTextChange}
        required />
    </li>
  );
}