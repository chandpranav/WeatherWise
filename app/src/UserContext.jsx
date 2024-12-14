import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from localStorage on initial load
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const signIn = (username) => {
        console.log("Signing in with username", username);
        const newUser = { user: username };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); // Save to localStorage
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear from localStorage
    };

    useEffect(() => {
        console.log("User updated:", user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
