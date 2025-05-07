import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "./components/Logo";
//import reactImg from "./assets/training_1.jpg";<img src={reactImg} alt="woman's training"/>
function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="left-side">
        <Logo />
        <div className="btn--box">
        <button className="btn--signup" onClick={() => navigate("/signup")}>SIGN UP</button>
        <button className="btn--login" onClick={() => navigate("/login")}>LOGIN</button>
        </div>
      </div>

      <div className="right-side">
          <div className="rotated-text">
            <h1 className="rotated-text--1">Level
              up</h1>
            <h1 className="rotated-text--2">Up</h1>
          </div>
          <p>start your fitness game</p>
          <div className="arrows">
            <i className='bx bx-caret-up'></i>
            <i className='bx bx-caret-up'></i>
            <i className='bx bx-caret-up'></i>
          </div>
      </div>
    </div>
  );
}

export default Home;