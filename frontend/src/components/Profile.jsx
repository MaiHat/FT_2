import React, { useRef, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";


function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout, userName, setShowProfile } = useAuth();
    const navigate = useNavigate(); 
    //setShowProfile(true);
   async function handleLogout() {
        setError("");
        navigate("/login");
        try {
            await logout();
        } catch(err) {
            setError("Failed to log out");
        }
    }

return (
<>
    <h1>Hello  you are logged in</h1>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Hello {userName}</h2>
            {error && <Alert variant="danger">{error}</Alert> }
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" 
            className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
            LOG OUT
        </Button>
    </div>
</>
)
}

export default Profile;