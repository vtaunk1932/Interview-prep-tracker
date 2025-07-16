// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import CompanyQuestions from '../pages/CompanyQuestions';
import Profile from '../pages/Profile'; // ✅ Import





const Navbar: React.FC = () => {
  const auth = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  if (!auth || !auth.user) return null;

  const { user, logout } = auth;

  return (
    <nav className="navbar">
      <h2 className="logo">Interview Prep Tracker</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/add">Add Topic</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/company-questions">Company Questions</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/bookmarks">Bookmarks</Link>



      </div>

      <div
        className="user-info"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <FontAwesomeIcon icon={faUserCircle} className="default-user-icon" />
        {dropdownVisible && (
          <div className="user-dropdown">
            <span>{user.displayName || "User"}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
