import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthAPI from '../../utils/context/AuthApi';

import '../css/CharacterList.css';

export default function CharacterList() {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);

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
            onClick={select}
          >
            <td>{item.name}</td>
            <td>{item.description}</td>
          </tr>
        )
        ));
    }
  };

  const select = (event) => {
    const tbody = event.target.parentNode.parentNode;
    for (let i = 0; i < tbody.children.length; i++) {
      tbody.children[i].classList.remove('selected')
    }
    event.target.parentNode.classList.add('selected');
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