import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,

} from "firebase/auth";
import { auth, db } from "../firebase";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        await sendEmailVerification(auth.currentUser);
      }
    );
  };


  


  const logout = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });





  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,

        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(UserContext);
};
export { UserAuth };
