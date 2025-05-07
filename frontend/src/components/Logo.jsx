
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Logo() {
    
    return (
        
        <div className="logo">
            <Link to="/"> 
            <div className="logo--icon">
                <i className='bx bx-dumbbell'></i>
            </div>
            <div className="logo--text">
                <span>Fiitness</span>
                <span>Tracker</span>
            </div>
           
            </Link>
        </div>
       
    )
}
