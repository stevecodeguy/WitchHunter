import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const Auth = () => {
  const [jwt, setJwt] = useState(null);
  const [jwtExpire, setJwtExpire] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((jwt, expires) => {
    setJwt(jwt);
    const jwtExpiration = expires || new Date(new Date().getTime() + 1000 * 60 * 60);
    setJwtExpire(jwtExpiration);
    localStorage.setItem(
      'userData', 
      JSON.stringify({ jwt, expires: jwtExpiration.toISOString() })
    );
    setIsLoggedIn(true);
  }, []);
  
  const logout = useCallback(() => {
    setJwt(null);
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setJwtExpire(null);
  }, []);
  
  useEffect(() => {
    if (jwt && jwtExpire) {
      const remainingTime = jwtExpire.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [jwt, logout, jwtExpire]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.jwt && new Date(storedData.expires) > new Date()) {
      login(storedData.jwt, new Date(storedData.expires));
    }
  }, [login]);

  return { jwt, login, logout, isLoggedIn };
};