import React,{ useState, useRef } from 'react'
import { Form,  Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/authContext";

export default function SignupTest() {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
  

    async function handleSignUp(event) {
        event.preventDefault();
        const enteredName = userNameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = passwordConfirmRef.current.value;

    // パスワードと確認用パスワードが一致しない場合
        if (enteredPassword !== enteredConfirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
    try { 
        setErrorMessage("");
        setLoading(true);        
        await signup(enteredEmail, enteredPassword);
        toast.success("User Registerd Successfully!", 
            {position: "top-center",
            });
        } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
        }
        setLoading(false);
    } 
  return (
    <div>
    
    
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>

            <Form onSubmit={handleSignUp}>
                <Form.Group id="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" ref={userNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
         <Link to="/Login">Already have an account?</Link>
      </div>
    
    </div>
  );
}
