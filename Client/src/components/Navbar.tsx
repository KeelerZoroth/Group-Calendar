
// import React, { useState } from 'react';
import '../navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();


  const handleLoginLogout = () => {
    if(auth.loggedIn()){
      auth.logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Group Calendar</div>
      <ul className="navbar-links">
        <Link to="/">
          <li>
            Calendar
          </li>
        </Link> 
        <Link to="/register">
          <li>
            Create New User
          </li>
        </Link>
        <Link to="/viewgroups">
          <li>
            View Groups
          </li>
        </Link>
        <Link to="/groupinfo">
          <li>
            Group Info
          </li>
        </Link>
        <li>
          <button className="navbar-button" onClick={handleLoginLogout}>
            {auth.loggedIn() !== '' ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;