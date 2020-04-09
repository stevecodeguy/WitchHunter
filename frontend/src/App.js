import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CharacterList from './routes/CharacterList/CharacterList';
import NewUser from './routes/NewUser/NewUser';
import Login from './routes/Login/Login';
import SignUpSignIn from './routes/SignUpSignIn/SignUpSignIn';

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
        <Route path='/character_list'>
          <CharacterList />
        </Route>
        <Route path='/character'>
          <Character />
          <Character2 />
          <Character3 />
        </Route>
        <Route path='/' exact>
          <SignUpSignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
