import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SignupFormData from "./components/SignupFormData";
import Profile from "./components/Profile";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupformdata" element={<SignupFormData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;