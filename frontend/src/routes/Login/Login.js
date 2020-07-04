import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [state, setState] = useState({
    username: '',
    password: '',
    success: null
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
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const result = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(state)
          });
        const data = await result.json();
        if (data.accessToken) {
          headers.append('Authorization', `Bearer ${data.accessToken}`);
          history.push({
            pathname: `${data.username}/character_list/`,
            customData: 'blah'
          });
        } else {
          setState({
            ...state,
            success: false
          })
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
      {state.success || state.success === null ? null : <p>Username or Password incorrect</p>}
    </form>
  );
}