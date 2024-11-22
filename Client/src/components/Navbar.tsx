
import React, { useState } from 'react';
import '../navbar.css';

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
          <a href="/calendar">Calendar</a>
        </li>
        <li>
          <a href="/new-user">New User</a>
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