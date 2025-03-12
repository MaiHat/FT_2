// src/Login.js
import React from "react";

function Login() {
  return (
    <div className="container">
         <h1>LOGIN</h1>
         <form action="/submit" method="POST">
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
              <button>LOG IN</button>
        </form>
    </div>
  );
}

export default Login;
