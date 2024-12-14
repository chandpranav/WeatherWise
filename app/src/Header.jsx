import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';

function Header() {
  return (
    <header className="header">
      {/* Add a Link to the default page */}
      <h1>
        <Link to="/" className="header-title">WeatherWise</Link>
      </h1>
      <nav>
        <Link to="/signin" className="header-button">Log In</Link>
        <Link to="/signup" className="header-button">Sign Up</Link>
      </nav>
    </header>
  );
}

export default Header;
