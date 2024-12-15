import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

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

    const signIn = (username) => {
        console.log("Signing in with username", username);
        const newUser = { user: username };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); // Save user to localStorage
        fetchFavoriteLocation(username); // Fetch and set favorite location
    };

    const signOut = () => {
        setUser(null);
        setFavoriteLocation(null); // Clear favorite location
        localStorage.removeItem('user'); // Clear user from localStorage
        localStorage.removeItem('favoriteLocation'); // Clear favorite location from localStorage
    };

    const fetchFavoriteLocation = async (username) => {
        try {
          console.log(username)
            const response = await fetch(`http://localhost:5001/user/getfavorite?user=${username}`);
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

    const updateFavoriteLocation = async (username, newFavorite) => {
        try {
            const response = await fetch(`http://localhost:5001/user/setfavorite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, favoriteLocation: newFavorite }),
            });
            if (response.ok) {
                setFavoriteLocation(newFavorite);
                localStorage.setItem('favoriteLocation', newFavorite); // Update localStorage
            }
        } catch (error) {
            console.error("Error updating favorite location:", error);
        }
    };

    useEffect(() => {
        console.log("User updated:", user);
    }, [user]);

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
