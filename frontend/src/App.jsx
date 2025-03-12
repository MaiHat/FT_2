import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/component/login" element={<Login />} />
        <Route path="/component/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;