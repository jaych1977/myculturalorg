import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎭 My Cultural Organisation
        </Link>
        <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/payment" 
              className="nav-link nav-link-donate" 
              onClick={() => setMenuOpen(false)}
            >
              Donate
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
