import React, { useState } from "react";
import "./signup.css";

function SignUp() {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch("http://localhost:5001/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert("Sign up successful!");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Error during sign up.");
            }
        } catch (error) {
            setErrorMessage("Failed to connect to the server.");
        }
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
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
                <button type="submit">Sign Up</button>
            </form>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
    );
}

export default SignUp;
