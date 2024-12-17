import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from localStorage on initial load
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [favoriteLocation, setFavoriteLocation] = useState(() => {
        // Retrieve favorite location from localStorage on initial load
        const savedFavorite = localStorage.getItem('favoriteLocation');
        return savedFavorite || null;
    });

    // Fetch favorite location from backend and update state
    const fetchFavoriteLocation = async (username) => {
        try {
            const response = await fetch(`${BASE_URL}/user/getfavorite?user=${username}`);
            const data = await response.json();

            if (data.favoriteLocation) {
                setFavoriteLocation(data.favoriteLocation);
                localStorage.setItem('favoriteLocation', data.favoriteLocation); // Save to localStorage
            } else {
                setFavoriteLocation(null);
                localStorage.removeItem('favoriteLocation'); // Clear if no favorite exists
            }
        } catch (error) {
            console.error("Error fetching favorite location:", error);
        }
    };

    // Update favorite location in backend and state
    const updateFavoriteLocation = async (username, newFavorite) => {
        try {
            const response = await fetch(`${BASE_URL}/user/setfavorite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, favoriteLocation: newFavorite }),
            });

            if (response.ok) {
                setFavoriteLocation(newFavorite);
                localStorage.setItem('favoriteLocation', newFavorite); // Update localStorage
            } else {
                console.error("Failed to update favorite location on the backend.");
            }
        } catch (error) {
            console.error("Error updating favorite location:", error);
        }
    };

    // Sign in the user and fetch their favorite location
    const signIn = async (username) => {
        console.log("Signing in with username:", username);
        const newUser = { user: username };

        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); // Save user to localStorage

        // Fetch favorite location after signing in
        await fetchFavoriteLocation(username);
    };

    // Sign out the user and clear their data
    const signOut = () => {
        setUser(null);
        setFavoriteLocation(null);

        localStorage.removeItem('user'); // Clear user from localStorage
        localStorage.removeItem('favoriteLocation'); // Clear favorite location from localStorage
    };

    // Effect to log changes to user
    useEffect(() => {
        console.log("User updated:", user);
    }, [user]);

    // Effect to log changes to favorite location
    useEffect(() => {
        console.log("Favorite location updated:", favoriteLocation);
    }, [favoriteLocation]);

    return (
        <UserContext.Provider
            value={{
                user,
                favoriteLocation,
                signIn,
                signOut,
                updateFavoriteLocation,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
