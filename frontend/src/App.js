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

// Character Routes
import CharacterList from './routes/character/list/CharacterList';
// import CharacterNew from './routes/character/new/CharacterNew';
import CharacterInfo from './components/character/characterSections/CharacterInfo';
import CharacterAbilityScores from './components/character/characterSections/CharacterAbilityScores';
import CharacterSkills from './components/character/characterSections/CharacterSkills';

// User Routes
import NewUser from './routes/user/newUser/NewUser';
import Login from './routes/user/login/Login';
import SignUpSignIn from './routes/user/signUpSignIn/SignUpSignIn';


function App() {
  const { jwt, login, logout, isLoggedIn } = Auth();

  let routes;

  if (isLoggedIn) {
    routes = (
      <Router>
        <Switch>
          <Route path='/character/new/info'>
            {/* <CharacterNew /> */}
            <CharacterInfo />
          </Route>
          <Route path='/character/new/abilities'>
            <CharacterAbilityScores />
          </Route>
          <Route path='/character/new/skills'>
            <CharacterSkills />
          </Route>
          <Route path='/characters'>
            <CharacterList />
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
