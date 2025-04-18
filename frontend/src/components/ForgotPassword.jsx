import React, { useRef, useState } from "react";
import { Form,  Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";


export default function ForgotPassword() {
  const emailRef = useRef();
  //const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  
  async function handleSubmit(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
   
   const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(enteredEmail)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    try {
        setMessage("");
        setErrorMessage("");
        setLoading(true);        
        await resetPassword(enteredEmail);
        setMessage("Check your inbox for further instructions");
    } catch {
      console.log(err.message);
      setErrorMessage("Failed to reset password");
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
    <>
      <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" ref={emailRef} required />
                      </Form.Group>
                      
                      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                       <Button disabled={loading} className="w-100" type="submit">
                            Reset Password
                        </Button>
                  </Form>
                  <div className="w-100 text-center mt-3">
                    <Link to="/login">LOG IN</Link>
                  </div>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            <Link to="/SignupTest">Do not have account yet?</Link>
            </div>
         
    </>
  )
}



