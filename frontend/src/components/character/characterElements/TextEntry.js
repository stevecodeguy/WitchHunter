import React, { useState } from 'react';

export default function TextEntry(props) {
  const [entry, setEntry] = useState('');

  const handleCharacterTextChange = (event) => {
    setEntry(event.target.value);
  }

  const label = (input) => {
    let labelName = input;
    if (labelName === undefined) {
      labelName = props.name;
    } else {
      labelName = props.labelName;
    }
    let firstLetter = labelName[0] || labelName.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + labelName.slice(1) : '';
 }

  return (
    <li>
      <label htmlFor={props.name}><b>{label(props.labelName)}</b></label>
      <input 
        type="text" 
        name={props.name} 
        value={entry} 
        onChange={handleCharacterTextChange}
        required />
    </li>
  );
}