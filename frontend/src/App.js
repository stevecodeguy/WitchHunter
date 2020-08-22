import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// Auth
import { AuthContext } from './utils/context/AuthContext';
// import { Auth } from './utils/auth/Auth';

// Character Pages
import CharacterList from './character/pages/CharacterList';
// import CharacterNew from './routes/character/new/CharacterNew';
import CharacterInfo from './character/components/CharacterInfo';
import CharacterAbilityScores from './character/components/CharacterAbilityScores';
import CharacterSkills from './character/components/CharacterSkills';

// User Routes
import NewUser from './user/pages/NewUser';
import Login from './user/pages/Login';
import SignUpSignIn from './user/pages/SignUpSignIn';


function App() {
  const auth = useContext(AuthContext);

  const protectedRoutes =
    (<Router>
      <Switch>
        <Route path='/character/new/info'>
          <CharacterInfo />
        </Route>
        <Route path='/character/new/abilities'>
          <CharacterAbilityScores />
        </Route>
        <Route path='/character/new/skills'>
          <CharacterSkills />
        </Route>
        <Route path='/characters' exact>
          <CharacterList />
        </Route>
        <Route path='/newuser'>
          <NewUser />
        </Route>
        <Route path='/login'>
          <Redirect to="/characters" />
        </Route>
        <Route path='/' exact>
          <Redirect to="/characters" />
        </Route>
      </Switch>
    </Router>);

  const openRoutes =
    (<Router>
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
        <Route path='*'>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>);

  if (!auth.state.userId) {
    if (!!localStorage.getItem('token') && !!JSON.parse(localStorage.getItem('token')).id) {
      auth.setUserId(JSON.parse(localStorage.getItem('token')).id);
    }
  }

  return auth.state.userId > 0 ? protectedRoutes : openRoutes;
}

export default App;
