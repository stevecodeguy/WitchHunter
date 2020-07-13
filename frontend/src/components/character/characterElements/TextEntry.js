import React, { useState } from 'react';

import LabelName from '../../../utils/LabelName';

export default function TextEntry(props) {
  const [entry, setEntry] = useState('');

  const handleCharacterTextChange = (event) => {
    setEntry(event.target.value);
  }

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <input 
        type="text" 
        name={props.name} 
        value={entry} 
        onChange={handleCharacterTextChange}
        required />
    </li>
  );
}