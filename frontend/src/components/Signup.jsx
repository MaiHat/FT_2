import React from "react";

function Signup() {
    return (
<div className="container">
            <h1>SIGN UP</h1>
            <form action="/submit" method="POST">
              <input
                onChange={handleChange}
                name="userName"
                value={contact.userName}
                placeholder="User Name"
              />
              <input
                onChange={handleChange}
                name="email"
                value={contact.email}
                placeholder="Email"
              />
              <input
                onChange={handleChange}
                name="password"
                value={contact.password}
                placeholder="Password"
              />
              <input
                onChange={handleChange}
                name="confirmPassword"
                value={contact.confirmPassword}
                placeholder="Confirm Password"
              />
              <button>SIGN UP</button>
            </form>
        </div>
    );
}

export default Signup;