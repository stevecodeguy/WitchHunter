import { createContext } from 'react';

export const AuthContext = createContext({
  jwt: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});