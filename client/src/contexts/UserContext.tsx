import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/storage/useLocalStorage';
import { getToken, removeToken, setToken } from '../utils/tokenHandler';

import useNotification from '../hooks/popup/useNotification';
import { login } from '../requests/users';

const UserContext: any = createContext(null);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null);

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
    removeToken();
    setUser(null);
  };

  //To get the user token
  const getUserToken = () => {
    return getToken();
  };

  //To check whether the user is logged in or not
  useEffect(() => {
    setIsLoggedIn(user !== (null || undefined) && getUserToken() !== (null || undefined));
  }, [user, setIsLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        getUserToken,
        setUserAndUserToken,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
