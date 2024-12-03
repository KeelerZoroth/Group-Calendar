import React, { useContext } from 'react';
import '../navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import UserContext from '../components/UserContext';  

const Navbar: React.FC = () => {
  const { currentGroup } = useContext(UserContext);  
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if(auth.loggedIn()){
      auth.logout();
    }
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        {/* Display the current group name if it exists, otherwise default to "Group Calendar" */}
        {currentGroup ? currentGroup.groupName : "Group Calendar"}
      </div>
      <ul className="navbar-links">
        <Link to="/">
          <li>
            Calendar
          </li>
        </Link> 
        <Link to="/groupinfo">
          <li>
            About Group
          </li>
        </Link>
        <Link to="/viewgroups">
          <li>
            View Groups
          </li>
        </Link>
        <Link to="/register">
          <li>
            Create New User
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