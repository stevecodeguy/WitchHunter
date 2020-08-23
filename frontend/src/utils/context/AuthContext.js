import React, {
  useReducer,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import AuthAPI from './AuthApi';

// Create Context
export const AuthContext = React.createContext();

const initalState = {
  authToken: null,
  uuid: null
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, uuid: action.payload.data.uuid, authToken: action.payload.data.authToken };
    case 'setUuid':
      return { ...state, uuid: action.payload };
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

  // Logout
  const logout = () => {
    dispatch({
      type: 'logout'
    });
  };

  // Set user UUID
  const setUuid = useCallback((uuid) => {
    try {
      dispatch({
        type: 'setUuid',
        payload: uuid
      })
    } catch(error) {
      console.error(`Error setting UUID: ${error}`);
    }
  }, []);

  // Memoized State
  const value = useMemo(() => {
    return {
      state,
      login,
      logout,
      setUuid,
    }
  }, [state, setUuid]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}