import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';

import './CharacterList.css';

export default function(){
  const auth = useContext(AuthContext);

  async function getCharacters(){
    try {
      const result = await fetch('http://localhost:3000/characters', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + auth.jwt,
            'Content-Type': 'application/json'
          }
        });
      const data = await result.json();
      console.log('data', data);
    } catch(err){
      console.log(err);
    }
  }

  if (!!auth.jwt) {
    getCharacters();
  } else {
    return <Redirect to="/" />
  }

  return(
    <>
      <h1>Characters</h1>
      <button>Create New Character</button>
      <div>
        <h3>Available Characters</h3>
      </div>
      <ul>
        {/* {data ? data : null} */}
      </ul>
    </>
  );
}