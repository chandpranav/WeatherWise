import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser hook to access user and signOut
import './styles/header.css';

function Header() {
    const { user, signOut } = useUser(); // Access user state and signOut function from context
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <header className="header">
            {/* Add a Link to the default page */}
            <h1>
                <Link to="/" id="title" className="header-title">WeatherWise</Link>
            </h1>
            <nav>
                {user ? ( // If a user is logged in
                    <div className="user-info">
                        <span>Hi, {user.user}!</span>
                        <div className="dropdown-container">
                            <button
                                className="header-button dropdown-button"
                                onClick={toggleDropdown}
                            >
                                Menu ▼
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/account" className="dropdown-item" onClick={closeDropdown}>
                                        Account
                                    </Link>
                                    <button className="dropdown-item logout-button" onClick={() => {
                                        signOut();
                                        closeDropdown();
                                    }}>
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : ( // If no user is logged in
                    <>
                        <Link to="/login" className="header-button">Log In</Link>
                        <Link to="/signup" className="header-button">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
