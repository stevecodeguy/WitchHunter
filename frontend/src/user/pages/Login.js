import React, { useState, useContext } from 'react';

import { AuthContext } from '../../utils/context/AuthContext';

export default function Login() {
  const auth = useContext(AuthContext);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    auth.login(credentials);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username"><b>Username</b></label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required />

        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required />

        <button type="submit">Login</button>
      </div>
    </form>
  );
}