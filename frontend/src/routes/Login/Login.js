import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Login() {
  const [state, setState] = useState({
    username: '',
    password: '',
    success: null
  });

  let history = useHistory();
  const cookies = new Cookies();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let userData = {
      username: state.username,
      password: state.password
    };

    async function getUser(){
      try {
        const result = await fetch('http://localhost:3000/checkcredentials', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
          });
        const data = await result.json();
        cookies.set('loggedIn', true, { path: '/', maxAge: 3600 });
        setState({
          ...state,
          success: data.success
        });
        if (data.success) history.push('/character');
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
      {state.success === 1 || state.success === null ? null : <p>Username or Password incorrect</p>}
    </form>
  );
}