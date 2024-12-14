import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser hook to access user and signOut
import './styles/header.css';

function Header() {
    const { user, signOut } = useUser(); // Access user state and signOut function from context

    return (
        <header className="header">
            {/* Add a Link to the default page */}
            <h1>
                <Link to="/" className="header-title">WeatherWise</Link>
            </h1>
            <nav>
                {user ? ( // If a user is logged in
                    <div className="user-info">
                        <span>Hi, {user.user}!</span>
                        <button className="header-button logout-button" onClick={signOut}>Log Out</button>
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
