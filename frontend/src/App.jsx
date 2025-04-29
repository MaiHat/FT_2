import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <>
    <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
    <div className="w-100" style={{ maxWidth: "400px" }} >
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </div>
      </Container>
      
    </>
  );
}

export default App;