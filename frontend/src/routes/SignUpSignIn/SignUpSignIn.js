import React from 'react';
import { Link } from 'react-router-dom';

import './signupsignin.css';

export default function Login() {
  return (
    <div id='login'>
      <nav>
        <Link to="/newuser"><li>Sign Up</li></Link>
        <Link to="/login"><li>Log In</li></Link>
      </nav>
    </div>
  );
}