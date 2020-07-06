import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';

// Auth
import { AuthContext } from './utils/context/AuthContext';
import { Auth } from './utils/auth/Auth';

// Routes
import CharacterList from './routes/CharacterList/CharacterList';
import NewUser from './routes/NewUser/NewUser';
import Login from './routes/Login/Login';
import SignUpSignIn from './routes/SignUpSignIn/SignUpSignIn';

import Character from './components/characterSections/CharacterInfo';
import Character2 from './components/characterSections/CharacterAbilityScores';
import Character3 from './components/characterSections/CharacterSkills';

function App() {
  const { jwt, login, logout, isLoggedIn } = Auth();

  let routes;

  if (isLoggedIn) {
    routes = (
      <Router>
        <Switch>
          <Route path='/characters'>
            <CharacterList />
          </Route>
          <Route path='/character'>
            <Character />
            <Character2 />
            <Character3 />
          </Route>
          <Route path='/' exact>
            <Redirect to="/characters" />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    routes = (
      <Router>
      <Redirect to="/" />
        <Switch>
          <Route path='/newuser'>
            <NewUser />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/' exact>
            <SignUpSignIn />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <AuthContext.Provider value={{
      jwt: jwt,
      login: login,
      logout: logout
    }}>
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
