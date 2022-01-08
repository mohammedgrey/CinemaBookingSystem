import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/storage/useLocalStorage';

import useNotification from '../hooks/popup/useNotification';
import { login } from '../requests/users';
import { tokenKey } from '../utils/tokenHandler';

const UserContext: any = createContext(null);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage(tokenKey, null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const { notify } = useNotification();

  //For logging the users in
  const loginUser = async (userCredetentials: any) => {
    console.log(userCredetentials);
    try {
      const res = await login(userCredetentials);
      setToken(res.token);
      setUser(res.data.user);
    } catch (err: any) {
      notify('Incorrect email or password', 'error');
    }
  };

  const setUserAndUserToken = (user: any, token: string) => {
    setToken(token);
    setUser(user);
  };

  //For logging the users out
  const logoutUser = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };
  console.log(isLoggedIn);

  //To check whether the user is logged in or not
  useEffect(() => {
    if (
      user == null ||
      user == undefined ||
      user == 'null' ||
      user == 'undefined' ||
      token == null ||
      token == undefined ||
      token == 'null' ||
      token == 'undefined'
    ) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user, token]);

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        setUserAndUserToken,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
