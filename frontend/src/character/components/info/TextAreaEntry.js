import React from 'react';

export default function TextEntry({ info, name, labelName, value, set }) {
  const handleCharacterTextAreaChange = (event) => {
    set({ ...info, [name]: event.target.value });
  }

  const label = (input) => {
    let labelName;
    input === undefined ? labelName = name : labelName = labelName;

    let firstLetter = labelName[0] || labelName.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + labelName.slice(1) : '';
  }

  return (
    <li>
      <label htmlFor={name}><b>{label(labelName)}</b></label>
      <textarea
        name={name}
        rows="6"
        cols="100"
        value={value}
        onChange={handleCharacterTextAreaChange}
      />
    </li>
  );
}