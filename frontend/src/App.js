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
import CharacterNew from './routes/character/new/CharacterNew';

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
          <Route path='/character/new'>
            <CharacterNew />
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
