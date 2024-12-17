import React, { useState } from "react";
import { useUser } from "./UserContext"; // Import the UserContext hook
import "./styles/account.css";

function SignUp() {
    const { signIn, user } = useUser(); // Always call hooks at the top level
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

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
                body: JSON.stringify({ 
                    user: username,
                    password: password 
                }),
            });

            if (response.ok) {
                setErrorMessage(""); // Clear previous errors
                signIn(username); // Explicitly call signIn to update the user
                setSuccessMessage(true); // Set success message
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
            {!successMessage ? (
                <>
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
                </>
            ) : (
                <div className="successMessage">
                    <p>Sign up successful! 🎉</p>
                    <p>You are now signed in as {user?.user || "Guest"}.</p>
                    <button onClick={() => (window.location.href = "/")}>
                        Return to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignUp;
