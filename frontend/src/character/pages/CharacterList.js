import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthAPI from '../../utils/context/AuthApi';
import { selectTableRow } from '../../utils/helpers/TableHelpers';

import '../css/characterList.css';

export default function CharacterList() {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rowClass, setRowClass] = useState([]);

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
      let rowCount = 0;
      return (
        characters.map(character => {
          rowCount++;
          return (
          <tr
            key={character.id}
            onClick={(event) => {
              setSelected(characters[selectTableRow(event)]);
              setRowClass(() => {
                let setClass = new Array(characters.length).join('.').split('.');
                setClass[selectTableRow(event)] = 'selected';
                return setClass;
              });
            }}
            className={rowClass[rowCount -1]}
          >
            <td>{character.name}</td>
            <td>{character.description}</td>
          </tr>
        )}
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