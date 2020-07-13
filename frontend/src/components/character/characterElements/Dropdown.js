import React, { useState } from 'react';

import LabelName from '../../../utils/LabelName';

export default function Dropdown(props) {
  const [selected, setSelected] = useState({});

  const handleCharacterDropdownChange = (event) => {
    const item = event.target.selectedIndex - 1;
    setSelected(props.data[item]);
  };

  return (
    <li>
      <label htmlFor={props.name}><b>{LabelName(props)}</b></label>
      <select 
        type="text" 
        name={props.name} 
        defaultValue=""
        onChange={(event) => handleCharacterDropdownChange(event)}
        required
      >
          <option value="" disabled>{`Choose ${LabelName(props)}`}</option>
          {
            props.data.map(item => (
              <option 
                key={item.id} 
                value={item[props.name]}
            >{item[props.name]}</option>
            ))
          }
      </select>
      {!!selected.description ? <p>{selected.description}</p> : null}
      {!!selected.benefit ? <p>{selected.benefit}</p> : null}
      {!!selected.social_standing && !!selected.ability && !!selected.ability_description ? (
          <>
            <h5>Social Standing: </h5>
            <p>{selected.social_standing}</p>
            <h5>Ability: </h5>
            <p>{selected.ability}</p>
            <h5>Ability Description: </h5>
            <p>{selected.ability_description}</p>
          </>
        ) : null
      }
    </li>
  );
}