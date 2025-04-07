import React, { useState } from "react";
import {Link} from "react-router-dom";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignupFormData() {


const [errorMessage, setErrorMessage] = useState("");

async function SignUpAction(formData) {
   const enteredName = formData.get("userName");
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");
    const enteredConfirmPassword = formData.get("confirmPassword");
 
 // パスワードと確認用パスワードが一致しない場合
  if (enteredPassword !== enteredConfirmPassword) {
    setErrorMessage("Passwords do not match.");
    return;
  }
  setErrorMessage("");

  try {
    await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
  } catch (err) {
    console.log(err.message);
    setErrorMessage(err.message);
  }

}


    return (
<div className="container">
            <h1>SIGN UP</h1>
            <form action={SignUpAction}>
              <input
                name="userName"
                placeholder="User Name"
               
                type="text"
                required
              />
              <input
                name="email"               
                placeholder="Email"
             
                type="email"
                required
              />
              <input
                name="password"               
                placeholder="Password"
              
                type="password"
                required              
              />
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
        
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

export default SignupFormData;