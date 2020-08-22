import React, {
  useReducer,
  useEffect,
  useMemo
} from 'react';
import AuthAPI, { updateToken } from './AuthApi';

// Create Context
export const AuthContext = React.createContext();

const initalState = {
  authToken: null,
  userId: null
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      updateToken(action.payload.data);
      setTimeout(() => {
        localStorage.removeItem('token');
        alert('token removed')
      }, 1000 * 60);
      return { ...state, authToken: action.payload.data.authToken };
    case 'setUserId':
      return { ...state, userId: action.payload };
    case 'reset':
      return initalState;
    default:
      return state;
  }
}

// Create Provider
export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(stateReducer, initalState);

  // Initialize provider
  useEffect(() => {
    console.log(`🌎...AuthContext initalized!`);
  }, []);

  // Login 
  const login = async (body) => {
    try {
      const result = await AuthAPI.post('/user/login', body);
      dispatch({
        type: 'login',
        payload: result,
      });
    } catch (error) {
      console.error(`Login error: ${error}`);
    }
  };

  const setUserId = (id) => {
    try {
      dispatch({
        type: 'setUserId',
        payload: id
      })
    } catch(error) {
      console.error(`Error setting user ID: ${error}`);
    }
  };

  // Logout
  const logout = () => {
    dispatch({
      type: 'logout'
    });
  };

  // Memoized State
  const value = useMemo(() => {
    return {
      state,
      login,
      logout,
      setUserId
    }
  }, [state]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}