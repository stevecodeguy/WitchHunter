import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';

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
    // let content = [];
    // for (let idx in characters) {
    //   console.log(idx)
    //   const item = characters[idx];
    //   content.push(<td key={item.name}>{item.name}</td>);
    // }
    // console.log('sgkhfsgdkaf', content)
    // return content;

    return (
        characters.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
          </tr>
      )
    ))
  }

  useEffect(() => {
    getCharacters();
  }, [ getCharacters]);

  return(
    <>
      <h1>Characters</h1>
      <button>Create New Character</button>
      <div>
        <h3>Available Characters</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            renderCharacters()

            // characters.entries(character).map((character, index) => {
              // <tr key={index}>
              //   <td>{character.name}</td>
              //   <td>{character.description}</td>
              // </tr>
              // <h1>test</h1>
            // })
          }
        </tbody>
      </table>
    </>
  );
}