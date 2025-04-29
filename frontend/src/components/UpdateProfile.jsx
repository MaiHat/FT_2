import React,{ useState, useRef } from 'react'
import { Form,  Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function UpdateProfile() {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, changeEmail, changePassword } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
  

    async function handleSubmit(event) {
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
        //await signup(enteredEmail, enteredPassword);
       console.log("User signed up successfully!");
       navigate("/profile");
        } catch (err) {
        console.log(err.message);
        setErrorMessage("Failed to sign up");
        }
        setLoading(false);
    } 
  return (
    <div>
    
    
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group id="username">
                    <Form.Label>New User Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    ref={userNameRef} 
                    required 
                    defaultValue={currentUser.username}
                    />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>New Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    ref={emailRef} 
                    required 
                    defaultValue={currentUser.email} 
                    />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="Leave blank to keep the same" 
                    />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control 
                    type="password" 
                    ref={passwordConfirmRef} 
                    placeholder="Leave blank to keep the same" 
                    />
                </Form.Group>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Button disabled={loading} className="w-100" type="submit">Update</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
         <Link to="/profile">Cancel</Link>
      </div>
    
    </div>
  );
}
