import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();


function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
   // const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            
        });
        return unsubscribe;
    }, [])

   // async function initializeUser(user) {
     //   if (user) {
      //      setCurrentUser({ ...user });
      //      setUserLoggedIn(true);
     //   } else {
      //      setCurrentUser(null);
      //      setUserLoggedIn(false);
       // }
       // setLoading(false); }
    

    const value = {
        currentUser,
        signup,
       // userLoggedIn,
       // loading
    }; 

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export { AuthProvider, useAuth };