import React,{ useState, useRef } from 'react'
import { Form,  Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Container } from "react-bootstrap";

export default function SignupTest() {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, getUserName } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
  
    async function handleSignUp(event) {
        event.preventDefault();
        const enteredName = userNameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = passwordConfirmRef.current.value;

    // パスワードと確認用パスワードが一致しない場合
        if (enteredPassword !== enteredConfirmPassword) {
            return setErrorMessage("Passwords do not match.");
        }
        try { 
            setErrorMessage("");
            setLoading(true);        
            await signup(enteredEmail, enteredPassword);
            await getUserName(enteredName);
            console.log("User signed up successfully!");
            navigate("/profile");
        } catch (err) {
            console.log(err.message);
            setErrorMessage("Failed to sign up");
        }
        setLoading(false);
    } 
  return (
    <div className='form'>
    <div className="form--container" >
     <div className='form--wrapper'>
       <div className='form--card'>
        <div className='form--card-body'>
        <h2 className="form--title">Sign Up</h2>
        
        <form onSubmit={handleSignUp}>
            <div className='form--group'> 
                <label>User Name</label>
                <input 
                id="userName"
                type="text" 
                ref={userNameRef} 
                required />
            </div>
            <div className='form--group'> 
                <label>Email</label>
                <input id="email" 
                type="email" 
                ref={emailRef} 
                required />
            </div>
            <div className='form--group'> 
                <label>Password</label>
                <input 
                id="password" 
                type="password" 
                ref={passwordRef} 
                required />
            </div>
            <div className='form--group'>   
                <label>Password Confirmation</label>
                <input 
                id="password-confirm" 
                type="password" 
                ref={passwordConfirmRef} 
                required />
            </div>
            {errorMessage && <div className="alert error">{errorMessage}</div>}
            <Button disabled={loading} className="submit-button" type="submit">Sign Up</Button>
        </form>
        
        <div clssName="form--link">
            <Link to="/Login">Already have an account?</Link>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
