import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Logout() {
    const [error, setError] = useState("");
    const { logout } = useAuth();
    const navigate = useNavigate(); 
    async function handleLogout() {
        setError("");
        
        try {
            await logout();
            navigate("/");
        } catch(err) {
            setError("Failed to log out");
        }
    }
    
  return (
    <div>
       <div className='logout'>
        <Link  onClick={handleLogout} to="/">
            LOG OUT
        </Link>
    </div>
    </div>
  )
}
