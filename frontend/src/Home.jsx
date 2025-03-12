import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <main className="container">
        <div className="left-side">              
            <div>
            <Link to="/signup">Sign Up</Link>
            </div>
            <div>
            <button onClick={() => navigate("/login")}>LOGIN</button>
            </div>
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