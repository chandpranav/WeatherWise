import React, { useState } from "react";
import { useUser } from "./UserContext"; // Import UserContext hook for managing user state
import "./styles/login.css"; // Import the CSS file

function Login() {
    const { signIn } = useUser(); // Get signIn function from context
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch("http://localhost:5001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                signIn(data.username); // Update the user context
                setErrorMessage(""); // Clear any error messages
                alert("Login successful!");
                window.location.href = "/"; // Redirect to homepage
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
