
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
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


  console.log(enteredEmail);
  console.log(enteredPassword);
  }
  return (
    <div className="container">
         <h1>LOGIN</h1>
         <form onSubmit={handleLogin}>
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
