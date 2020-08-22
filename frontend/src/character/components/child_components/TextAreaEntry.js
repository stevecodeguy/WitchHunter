import React, { useState } from 'react';

export default function TextEntry(props) {
  const [entry, setEntry] = useState('');

  const handleCharacterTextAreaChange = (event) => {
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
      <textarea 
        name={props.name} 
        rows="6"
        cols="100"
        value={entry} 
        onChange={handleCharacterTextAreaChange}
        required />
    </li>
  );
}