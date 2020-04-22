import React, { useState } from 'react';
import Cookies from 'universal-cookie';

export default function NewUser() {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    success: null,
    message: ''
  })

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
      password: state.password,
      email: state.email
    };

    const cookies = new Cookies();

    async function createNewUser(){
      try {
        const result = await fetch('http://localhost:3000/createuser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        });
        const data = await result.json();
        cookies.set('WHUserJWT', data.token, { path: '/', maxAge: 60 * 60 * 60 });
        setState({
          ...state,
          success: data.success,
          message: data.message
        })
      } catch(error) {
        console.log(error);
      }
    }
    createNewUser();
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
          onChange={(event) => handleChange(event)}
          required />

        <label htmlFor="password"><b>Password</b></label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="password" 
          value={state.password} 
          onChange={(event) => handleChange(event)}
          required />

        <label htmlFor="email"><b>Email</b></label>
        <input 
          type="email" 
          placeholder="Enter Email" 
          name="email" 
          value={state.email} 
          onChange={(event) => handleChange(event)}
          required />

        <button type="submit">Create Account</button>
      </div>
      {state.success === 1 ? <p>Account creation successful.</p> : null}
    </form>
  );
}