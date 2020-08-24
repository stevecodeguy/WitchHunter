import React from 'react';

export default function TextEntry(props) {
  const handleCharacterTextAreaChange = (event) => {
    props.set(event.target.value);
  }

  const label = (input) => {
    let labelName;
    input === undefined ? labelName = props.name : labelName = props.labelName;

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
        value={props.value}
        onChange={handleCharacterTextAreaChange}
        required />
    </li>
  );
}