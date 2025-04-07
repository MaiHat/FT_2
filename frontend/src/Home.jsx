import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import reactImg from "./assets/training_1.jpg";
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <main className="container">
        <div className="left-side">   
            <img src={reactImg} alt="woman's training"/>           
            <div>
            <button onClick={() => navigate("/signup")}>SIGN UP</button>
            </div>
            <div>
            <button onClick={() => navigate("/login")}>LOGIN</button>
            </div>
            <button onClick={() => navigate("/signupformdata")}>SIGN UP FormData</button>
        </div>

        <div className="right-side">
            <div><h1>LEVEL UP</h1></div>

            <p>track yout fitness</p>
            <div><h2></h2></div>
        </div>
     </main>
    </div>
  );
}

export default Home;