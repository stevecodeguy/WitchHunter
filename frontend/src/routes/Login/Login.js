import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../utils/context/AuthContext';

export default function Login(props) {
  const auth = useContext(AuthContext);
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  let history = useHistory();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    async function getUser(){
      try {
        const result = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        });

        const data = await result.json();
        if (data.token) {
          await auth.login(data.token);
          history.push({
            pathname: `characters/`
          });
        } 
      } catch(error) {
        console.log(error);
      }
    }

    getUser();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      
      <div>
        <label htmlFor="username"><b>Username</b></label>
        <input 
          type="text" 
          placeholder="Enter Username" 
          name="username" 
          value={state.username} 
          onChange={handleChange}
          required />

        <label htmlFor="password"><b>Password</b></label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="password" 
          value={state.password} 
          onChange={handleChange}
          required />

        <button type="submit">Login</button>
      </div>
      {/* {state.success || state.success === null ? null : <p>Username or Password incorrect</p>} */}
    </form>
  );
}