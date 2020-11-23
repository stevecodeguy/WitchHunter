import React, { useState, useEffect, useCallback, useContext } from 'react';

import LabelName from '../../../utils/helpers/LabelName';
import { AuthContext } from '../../../utils/context/AuthContext';
import AuthAPI from '../../../utils/context/AuthApi';

export default function Dropdown({info, name, labelName, value, set}) {
  const [dropdown, setDropdown] = useState([]);
  const auth = useContext(AuthContext);

  const handleCharacterDropdownChange = (event) => {
    event.preventDefault();
    const item = event.target.selectedIndex - 1;
    set({...info, [name === 'sin_vice' ? 'sinVice' : name]: dropdown[item]});
  };

  const getDropdownData = useCallback(async () => {
    if (!!name && !!auth.state.uuid) {
      try {
        const results = await AuthAPI.get(`http://localhost:3000/info/${name}`);
        setDropdown(results.data);
      } catch (error) {
        console.log(`Error retrieving ${name}: ${error}`);
      }
    }
  }, [name, auth.state.uuid,]);

  useEffect(() => {
    getDropdownData();
  }, [getDropdownData]);

  return (
    <li>
      <label htmlFor={name}><b>{LabelName(name, labelName)}</b></label>
      <select
        type="text"
        name={name}
        onChange={(event) => handleCharacterDropdownChange(event)}
        value={value[name]}
        required
      >
        <option value="" disabled>{`Choose ${LabelName(name, labelName)}`}</option>
        {
          dropdown.length > 0 ?
            dropdown.map(item => (
              <option
                key={item.id}
                value={item[name]}
              >{item[name]}</option>
            )) : null
        }
      </select>
      {!!value && !!value.description ? <p>{value.description}</p> : null}
      {!!value && !!value.benefit ? <p>{value.benefit}</p> : null}
      {!!value && !!value.social_standing && !!value.ability && !!value.ability_description ? (
        <>
          <h5>Social Standing: </h5>
          <p>{value.social_standing}</p>
          <h5>Ability: </h5>
          <p>{value.ability}</p>
          <h5>Ability Description: </h5>
          <p>{value.ability_description}</p>
        </>
      ) : null
      }
    </li>
  );
}