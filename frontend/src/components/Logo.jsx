
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Logo() {
    
    return (
        
        <div className="logo--box">
        <Link to="/">
        <div className="logo--text">
        <span>Fiitness</span>
        <span>Tracker</span>
        </div>
        <div className="logo--icon">
        <i className='bx bx-dumbbell'></i>
        </div>
        </Link>
        </div>
       
    )
}
