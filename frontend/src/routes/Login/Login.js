import React, { useState } from 'react';
import Cookies from 'universal-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies();

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let userData = {
      username: username,
      password: password,
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
        console.log('Login Attempt Status: ' + data);
        cookies.set('username', userData.username, { path: '/' });
      })
    })
  }

  return (
    <form onSubmit={handleFormSubmit} method="post">

      <div>
        <label htmlFor="username"><b>Username</b></label>
        <input 
          type="text" 
          placeholder="Enter Username" 
          name="username" 
          value={username} 
          onChange={handleUserChange}
          required />

        <label htmlFor="password"><b>Password</b></label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="password" 
          value={password} 
          onChange={handlePasswordChange}
          required />

        <button type="submit">Login</button>
      </div>
    </form>
  );
}