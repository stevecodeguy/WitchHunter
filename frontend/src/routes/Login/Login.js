import React, { useState } from 'react';
import Cookies from 'universal-cookie';

export default function Login() {
  const [state, setState] = useState({
    username: '',
    password: ''
  });

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

    fetch('http://localhost:3000/checkcredentials', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    }).then(res => {
      res.text().then(data => {
        if (data === 'OK') {
          cookies.set('loggedIn', true, { path: '/', maxAge: 3600 });
          console.log('Login successful!')
        } else {
          console.log('Login denied!')
        }
      })
    })
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
    </form>
  );
}