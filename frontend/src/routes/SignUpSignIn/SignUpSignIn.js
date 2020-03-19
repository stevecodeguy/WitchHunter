import React from 'react';
import { Link } from 'react-router-dom';

import './signupsignin.css';

export default function Login() {
  return (
    <div id='login'>
      <nav>
        <li><Link to="/newuser">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </nav>
    </div>
  );
}