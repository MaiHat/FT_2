import React from "react";

function Signup() {
    return (
<div className="container">
            <h1>SIGN UP</h1>
            <form action="/submit" method="POST">
              <input
                name="userName"
                placeholder="User Name"
              />
              <input
                name="email"               
                placeholder="Email"
              />
              <input
                name="password"               
                placeholder="Password"
              />
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <button>SIGN UP</button>
            </form>
        </div>
    );
}

export default Signup;