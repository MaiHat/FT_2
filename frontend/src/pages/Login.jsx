
import React from "react";

const Login = () => {
  return (
    <div className="container">
         <h1>LOGIN</h1>
         <form action="/submit" method="POST">
              <input
                name="email"
                placeholder="Email"
              />
              <input
                name="password"
                placeholder="Password"
              />
              <button>LOG IN</button>
        </form>
    </div>
  )
}

export default Login;
