import { useState } from 'react';

export default function useLoggedIn() {
  const getLoggedIn = () => {
    const loggedInStr = sessionStorage.getItem('logged_in');
    const loggedIn = JSON.parse(loggedInStr);
    return loggedIn;
  };

  const [loggedIn, setLoggedIn] = useState(getLoggedIn());

  const saveLoggedIn = loggedIn => {
    sessionStorage.setItem('logged_in', JSON.stringify(loggedIn));
    setLoggedIn(loggedIn);
  };

  return {
    setLoggedIn: saveLoggedIn,
    loggedIn
  }
}
