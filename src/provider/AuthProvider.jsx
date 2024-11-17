import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true); 

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () =>{
    setLoading(true);
    return signOut(auth);
  };

  const loginUser = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser,updatedData);
  }


  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOutUser,
    loginUser,
    loading,
    updateUserProfile
  };
  // console.log(user);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () =>{
        unSubscribe();
    }
  }, []);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
