import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        sendPasswordResetEmail,
        updateProfile,
        updateEmail,
        updatePassword,
        deleteUser
     } from "firebase/auth";

const AuthContext = React.createContext();

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("Guest");
    const [showProfile, setShowProfile] = useState(true);

    function signup(email, password, username) {
        createUserWithEmailAndPassword(auth, email, password);
        setUserName(username);
        updateProfile(auth.currentUser, {displayName: username});
        console.log(email, password, username);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password); 
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    //function changeProfile(userName, email, password) {
    //    updateProfile(user {
    //       displayName: user.userName, 
            
    //      });
   // }

    function changeEmail(email) {
        return updateEmail(user, email);
    }

    function changePassword(password) {
        return updatePassword(user, password);
    }

    function deleteUser(User) {
        return deleteUser(user);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            
        });
        return unsubscribe;
    }, [])
    

    const value = {
        currentUser,
        showProfile,
        userName,
        signup,
        login,
        logout,
        loading,
        resetPassword,
        changeEmail,
        changePassword,
        deleteUser

    }; 

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export { AuthProvider, useAuth };