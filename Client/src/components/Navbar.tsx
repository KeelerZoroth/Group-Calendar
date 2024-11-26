
import React, { useState } from 'react';
import '../navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Group Calendar</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Calendar</Link>
        </li>
        <li>
          <Link to="/">Create User</Link>
        </li>
        <li>
          <Link to="/viewgroups">View Groups</Link>
        </li>
        <li>
          <Link to="/groupinfo">Group Info</Link>
        </li>
        <li>
          <button className="navbar-button" onClick={handleLoginLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;