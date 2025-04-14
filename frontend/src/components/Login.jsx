
import React, { useRef, useState } from "react";
import { Form,  Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
//import { useAuth } from "../contexts/authContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
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
    <div className="container">
      <Card>
              <Card.Body>
                  <h2 className="text-center mb-4">LOGIN</h2>
      
                  <Form onSubmit={handleLogin}>
                      <Form.Group id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" ref={emailRef} required />
                      </Form.Group>
                      <Form.Group id="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" ref={passwordRef} required />
                      </Form.Group>
                      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                      <Button disabled={loading} className="w-100" type="submit">LOG IN</Button>
                  </Form>
              </Card.Body>
            </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/SignupTest">Do not have account yet?</Link>
        </div>
         
    </div>
  )
}

export default Login;
