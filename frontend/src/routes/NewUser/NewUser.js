import React, { useState } from 'react';

export default function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let userData = {
      username: username,
      password: password,
      email: email
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

        <label htmlFor="email"><b>Email</b></label>
        <input 
          type="email" 
          placeholder="Enter Email" 
          name="email" 
          value={email} 
          onChange={handleEmailChange}
          required />

        <button type="submit">Create Account</button>
      </div>
    </form>
  );
}