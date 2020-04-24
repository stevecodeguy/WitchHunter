import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

export default function Login() {
  const [state, setState] = useState({
    username: '',
    password: '',
    success: null
  });

  // let history = useHistory();

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
        const result = await fetch('http://localhost:3000/checkcredentials', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
          });
        const token = await result.json();

        let setHeaders = new Headers();
        setHeaders.append('Authorization', `Bearer ${token.accessToken}`);

        // if (data.success) history.push(`/character_list/${data.user}`);
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