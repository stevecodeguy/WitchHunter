import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../../utils/context/AuthContext';

import './CharacterList.css';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const auth = useContext(AuthContext);
  const getCharacters = useCallback( async () => {
    if (!!auth.jwt) {
      await fetch('http://localhost:3000/characters', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + auth.jwt,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          setCharacters(data);
        })
        .catch(error => {console.log(error)});
    } else {
      return <Redirect to="/" />
    }
  }, [auth.jwt]);

  const renderCharacters = () => {
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
    ))
  };

  const select = (event) => {
    const tbody = event.target.parentNode.parentNode;
    for (let i = 0; i < tbody.children.length; i++){
      tbody.children[i].classList.remove('selected')
    }
    event.target.parentNode.classList.add('selected');
  };

  const createButton = (event) =>  {
    event.preventDefault();
    
    return <Redirect to='/characters/new' />
  };

  useEffect(() => {
    getCharacters();
  }, [ getCharacters]);

  return(
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
          { renderCharacters() }
        </tbody>
      </table>
    </>
  );
}