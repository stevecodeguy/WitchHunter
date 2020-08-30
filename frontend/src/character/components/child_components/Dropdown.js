import React, { useState, useEffect, useCallback, useContext } from 'react';

import LabelName from '../../../utils/LabelName';
import { AuthContext } from '../../../utils/context/AuthContext';
import AuthAPI from '../../../utils/context/AuthApi';

export default function Dropdown(props) {
  const [dropdown, setDropdown] = useState([]);
  const auth = useContext(AuthContext);

  const handleCharacterDropdownChange = (event) => {
    event.preventDefault();
    const item = event.target.selectedIndex - 1;
    props.set(dropdown[item]);
  };

  const getDropdownData = useCallback(async () => {
    if (!!props.name && !!auth.state.uuid) {
      try {
        const results = await AuthAPI.get(`http://localhost:3000/info/${props.name}`);
        setDropdown(results.data);
      } catch (error) {
        console.log(`Error retrieving ${props.name}: ${error}`);
      }
    }
  }, [props.name, auth.state.uuid,]);

  useEffect(() => {
    getDropdownData();
  }, [getDropdownData]);

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
          dropdown.length > 0 ?
            dropdown.map(item => (
              <option
                key={item.id}
                value={item[props.name]}
              >{item[props.name]}</option>
            )) : null
        }
      </select>
      {!!props.value && !!props.value.description ? <p>{props.value.description}</p> : null}
      {!!props.value && !!props.value.benefit ? <p>{props.value.benefit}</p> : null}
      {!!props.value && !!props.value.social_standing && !!props.value.ability && !!props.value.ability_description ? (
        <>
          <h5>Social Standing: </h5>
          <p>{props.value.social_standing}</p>
          <h5>Ability: </h5>
          <p>{props.value.background.ability}</p>
          <h5>Ability Description: </h5>
          <p>{props.value.ability_description}</p>
        </>
      ) : null
      }
    </li>
  );
}