import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext'; // ✅ fixed typo here
import axios from 'axios';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setloading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setloading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      setloading(false);

      if (currentUser?.email) {
        axios.post(
          'https://blog-server-five-alpha.vercel.app/jwt',
          { email: currentUser.email },
          { withCredentials: true }
        )
        .then(res => {
          console.log('Token set after JWT:', res.data);
        })
        .catch(error => console.log('JWT error:', error));
      }
      

      console.log('Auth state changed: ', currentUser);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
