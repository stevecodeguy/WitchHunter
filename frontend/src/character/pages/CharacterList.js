import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthAPI from '../../utils/context/AuthApi';
import selectTableBodyIndex from '../../utils/helpers/TableHelpers';

import '../css/characterList.css';

export default function CharacterList() {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const results = await AuthAPI.get('/characters');
        setCharacters(results.data.result);
      } catch (error) {
        console.log('Error getting characters:', error);
      }
    }
    getCharacters();
  }, []);

  const renderCharacters = () => {
    if (!!characters) {
      return (
        characters.map(item => (
          <tr
            key={item.id}
            onClick={(event) => setSelected(characters[selectTableBodyIndex(event)])}
          >
            <td>{item.name}</td>
            <td>{item.description}</td>
          </tr>
        )
        ));
    }
  };

  const createButton = (event) => {
    event.preventDefault();

    history.push('/character/new/info');
  };

  return (
    <>
      <h1>Characters</h1>
      <button onClick={createButton}>Create New Character</button>
      <div>
        <h3>Available Characters</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th id='tableName'>Name</th>
            <th id='tableDescription'>Description</th>
          </tr>
        </thead>
        <tbody>
          {renderCharacters()}
        </tbody>
      </table>
    </>
  );
}