import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  token: '',
  validUntil: '',
  userProfile: null,
  isAuthenticated: false,
  authenticate: token => {},
  updateUserProfile: profileData => {},
  logout: () => {},
});

const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState();
  const [userProfile, setUserProfile] = useState();

  const authenticate = token => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  const updateUserProfile = profileData => {
    setUserProfile(profileData);
  };

  const value = {
    token: authToken,

    isAuthenticated: !!authToken,
    userProfile,
    authenticate,
    updateUserProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
