
import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  async function handleLogin(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    if (!enteredEmail || !enteredPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
   const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(enteredEmail)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword); 
      console.log("User logged in successfully!");
      
    } catch(err) {
      console.log(err.message);
      setErrorMessage(errorMessage);
    }
    //if (!isSigningIn) {
     // setIsSigningIn(true);
      //try {await doSignInWithEmailAndPassword(enteredEmail, enteredPassword);
    //} catch (err) {
      //setErrorMessage(err.message);
     // setIsSigningIn(false);
    }
  

  //const onGoogleSignIn = (event) => {
    //event.preventDefault();
   // if(!isSigningIn) {
    //  setIsSigningIn(true);
     // doSignInWithGoogle().catch(err => {
    //    setErrorMessage(err.message);
     //   setIsSigningIn(false);
     // }); }  };
  return (
    <div className="container">
      
         <h1>LOGIN</h1>
         <form onSubmit={handleLogin}>
              <input
                name="email"
                placeholder="Email"
                ref={emailRef}
                type="email"
                required
              />
              <input
                name="password"
                placeholder="Password"
                ref={passwordRef}
                type="password"
                required
              />
              <button>LOG IN</button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <Link to="/Signup">Do not have account yet?</Link>
          
        </div>
         
    </div>
  )
}

export default Login;
