import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser } from './db';
import { createBoardWithDemoData } from '@/utils/createBoardWithDemoData';

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

      setUser(user);
      createUser(user.uid, user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGoogle = async (redirect) => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      handleUser(response.user);
      const userData = auth.currentUser;
      if (userData.metadata.creationTime === userData.metadata.lastSignInTime) {
        await createBoardWithDemoData(response.user.uid);
      }
      if (redirect) {
        Router.push(redirect);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signinWithGitHub = async (redirect) => {
    try {
      const response = await signInWithPopup(auth, new GithubAuthProvider());
      handleUser(response.user);
      const userData = auth.currentUser;
      if (userData.metadata.creationTime === userData.metadata.lastSignInTime) {
        await createBoardWithDemoData(response.user.uid);
      }
      if (redirect) {
        Router.push(redirect);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signout = async () => {
    Router.push('/');

    try {
      await signOut(auth);
      handleUser(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGoogle,
    signinWithGitHub,
    signout
  };
}

const formatuser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL
  };
};
