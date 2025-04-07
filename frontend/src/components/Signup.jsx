import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";

function Signup() {

const userNameRef = useRef();
const emailRef = useRef();
const passwordRef = useRef();
const confirmPasswordRef = useRef();
const [errorMessage, setErrorMessage] = useState("");

async function handleSignUp(event) {
  event.preventDefault();
  const enteredName = userNameRef.current.value;
  const enteredEmail = emailRef.current.value;
  const enteredPassword = passwordRef.current.value;
  const enteredConfirmPassword = confirmPasswordRef.current.value;

  // パスワードと確認用パスワードが一致しない場合
  if (enteredPassword !== enteredConfirmPassword) {
    setErrorMessage("Passwords do not match.");
    return;
  }
  setErrorMessage("");

  try {
   await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
   const user = auth.currentUser;
   console.log("user registered", user);
   toast.success("User Registerd Successfully!", 
    {position: "top-center",
    });
  } catch (err) {
   console.log(err.message);
   setErrorMessage(err.message);
  }

}


    return (
<div className="container">
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignUp}>
              <input
                name="userName"
                placeholder="User Name"
                ref={userNameRef}
                type="text"
                required
              />
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
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                type="password"
                required
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button>SIGN UP</button>
            </form>

            <div>
              <Link to="/Login">
              Already have your account?
              </Link>
            </div>
        </div>
    );
}

export default Signup;