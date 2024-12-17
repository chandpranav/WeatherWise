import React, { useState } from "react";
import { useUser } from "./UserContext"; // Import UserContext hook for managing user state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./styles/account.css"; // Import the CSS file

function Login() {
    const { signIn } = useUser(); // Get signIn function from context
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Hook to handle navigation

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch("http://localhost:5001/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    user: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                signIn(username); // Update the user context
                setErrorMessage(""); // Clear any error messages
                navigate("/"); // Redirect to the main page
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Invalid username or password");
            }
        } catch (error) {
            setErrorMessage("Failed to connect to the server.");
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
    );
}

export default Login;
