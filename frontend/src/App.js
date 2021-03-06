import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// Auth
import { AuthContext } from './utils/context/AuthContext';

// Character Pages
import CharacterList from './character/pages/CharacterList';
import CharacterInfo from './character/pages/CharacterInfo';
import CharacterAbilityScores from './character/pages/CharacterAbilityScores';
import CharacterSkills from './character/pages/CharacterSkills';
import CharacterTalents from './character/pages/CharacterTalents';
import CharacterEquipment from './character/pages/CharacterEquipment';
import CharacterReview from './character/pages/CharacterReview';

// User Routes
import NewUser from './user/pages/NewUser';
import Login from './user/pages/Login';
import SignUpSignIn from './user/pages/SignUpSignIn';

function App() {
  const { state, setUuid } = useContext(AuthContext);

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
        <Route path='/character/new/talents'>
          <CharacterTalents />
        </Route>
        <Route path='/character/new/equipment'>
          <CharacterEquipment />
        </Route>
        <Route path='/character/new/review'>
          <CharacterReview />
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

  useEffect(() => {
    if (!state.uuid) {
      const token = localStorage.getItem('token');
      if (!!token && !!JSON.parse(token).uuid) {
        const timestamp = JSON.parse(token).timestamp;
        if (!!timestamp && new Date().getTime() - timestamp > 1000 * 60 * 60) {
          return localStorage.clear();
        }
        setUuid(JSON.parse(token).uuid);
        localStorage.setItem('token', JSON.stringify({ ...JSON.parse(token), timestamp: new Date().getTime() }));
      }
    }
  }, [state.uuid, setUuid]);

  return !!state.uuid ? protectedRoutes : openRoutes;
}

export default App;
