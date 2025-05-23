import React from 'react';
import Logo from "./Logo";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='header'>
        <div className='header--wrapper'>
          <div className='header--left'>
            <Logo />
          </div>
          <div className="header-right">
            <Logout />
            <Link to="/update-profile" >Update Profile</Link>
          </div>
        </div>
      
    </div>
  )
}
