import {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../store/auth-context';

import {loginUserApi, addUserApi} from '../util/http';

const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isTryingLoginIn, setIsTryingLoginIn] = useState(true);

  const {token, logout, authenticate, isAuthenticated} =
    useContext(AuthContext);

  const loginUser = async (username, password) => {
    const loginDataFormatted = {
      username: username,
      password: password,
    };

    setIsAuthenticating(true);
    const loginResponse = await loginUserApi(loginDataFormatted);
    setIsAuthenticating(false);

    // Extract user token
    const token = loginResponse;

    if (loginResponse?.error || !token) {
      return;
    }

    // Store data
    authenticate(token);
    AsyncStorage.setItem('token', token);
  };

  const logoutUser = useCallback(() => {
    logout();
    AsyncStorage.removeItem('token');
  }, [logout]);

  const createUser = async (name, email, username, password) => {
    const signupDataFormatted = {
      firstName: name,
      email: email,
      username: username,
      password: password,
    };

    setIsAuthenticating(true);
    await addUserApi(signupDataFormatted);
    setIsAuthenticating(false);
  };

  useEffect(() => {
    const fetchTokenFromAsyncStorage = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken && !token) {
        if (storedToken) {
          authenticate(storedToken);
        } else {
          logoutUser();
        }

        setIsTryingLoginIn(false);
      }
    };

    fetchTokenFromAsyncStorage();
  }, [logoutUser, authenticate, token]);

  return {
    isAuthenticating,
    isTryingLoginIn,

    loginUser,
    logoutUser,
    createUser,

    token: token,
    isAuthenticated: isAuthenticated,
    authenticate: authenticate,
    logout: logout,
  };
};

export default useAuth;
