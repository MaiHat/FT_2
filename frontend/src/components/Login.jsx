
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Logo from "./Logo";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
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
      setErrorMessage("");
      setLoading(true);        
      await login(enteredEmail, enteredPassword); 
      console.log("User logged in successfully!");
      navigate("/profile");
    } catch(err) {
      console.log(err.message);
      setErrorMessage("Failed to log in");
    }
    //if (!isSigningIn) {
     // setIsSigningIn(true);
      //try {await doSignInWithEmailAndPassword(enteredEmail, enteredPassword);
    //} catch (err) {
      //setErrorMessage(err.message);
     // setIsSigningIn(false);
     setLoading(false);
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
    <div className="form">
      <Logo />
      <div className="form--container">
        <div className="form--wrapper">
          <div className="form--card">
            <div className="form--card-body">
              <h2 className="form--title">LOGIN</h2>
      
              <form onSubmit={handleLogin}>
                <div className="form--group">
                  <label>Email</label>
                  <input id="email" type="email" ref={emailRef} required />
                </div>
                <div className="form--group" >
                  <label>Password</label>
                  <input id="password" type="password" ref={passwordRef} required />
                </div>
                {errorMessage && <div className="alert error">{errorMessage}</div>}
                <button disabled={loading} className="submit-button" type="submit">LOG IN</button>
              </form>
              <div className="form--link">
              <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="form--link">
              <Link to="/Signup">Do not have account yet?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
