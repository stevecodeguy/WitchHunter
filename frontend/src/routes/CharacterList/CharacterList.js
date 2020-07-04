import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import './CharacterList.css';


export default function(props){
  const location = useLocation();
  let data = {};
  console.log(props)
  console.log(location)
  console.log(props.location)

  async function getCharacters(){
    try {
      let headers = new Headers();
          headers.append('Accept', 'application/json');
          headers.append('Content-Type', 'application/json');

      const result = await fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: headers
      });
      data = await result;
      console.log(data)
    } catch(err){
      console.log(err);
    }
  }
  getCharacters();

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