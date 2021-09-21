import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawuser) => {
    if (rawuser) {
      const user = formatuser(rawuser);

      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGitHub = () => {
    return signInWithPopup(auth, new GithubAuthProvider()).then((response) =>
      handleUser(response.user)
    );
  };

  const signout = () => {
    return signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signout
  };
}

const formatuser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
