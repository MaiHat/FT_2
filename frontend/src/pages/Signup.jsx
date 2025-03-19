import React, { useRef, useState } from "react";
import {Link} from "react-router-dom";

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

  //エラーハンドリング
  if (!enteredName || !enteredEmail || !enteredPassword || !enteredConfirmPassword) {
    setErrorMessage("Please fill in all fields.");
    return;
  } 
//アドレスの形式チェック
const emailRegex = /\S+@\S+\.\S+/;
if (!emailRegex.test(enteredEmail)) {
  setErrorMessage("Invalid email address.");
  return;
}
// パスワードと確認用パスワードが一致しない場合
if (enteredPassword !== enteredConfirmPassword) {
  setErrorMessage("Passwords do not match.");
  return;
}
setErrorMessage("");

console.log(enteredName);
console.log(enteredEmail, enteredPassword, enteredConfirmPassword);


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
              />
              <input
                name="email"               
                placeholder="Email"
                ref={emailRef} 
                type="email"    
              />
              <input
                name="password"               
                placeholder="Password"
                ref={passwordRef}
                type="password"                
              />
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                type="password"
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