import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NewUser from './routes/NewUser/NewUser';
import Login from './routes/Login/Login';

import Character from './components/characterSections/CharacterInfo';
import Character2 from './components/characterSections/CharacterAbilityScores';
import Character3 from './components/characterSections/CharacterSkills';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/newuser'>
          <NewUser />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/' exact>
          <Character />
          <Character2 />
          <Character3 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
