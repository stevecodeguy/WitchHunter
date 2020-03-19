import React, { useState } from 'react';

export default function NewUser() {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = () => {
    let userData = {
      username: state.username,
      password: state.password,
      email: state.email
    };

    fetch('http://localhost:3000/createuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    }).then(res => {
      res.text().then(data => {
        console.log('User Creation Attempt Status: ' + data);
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
    </form>
  );
}