/*
UserContext.jsx

This file allows the use of a constant user throughout the app. It includes a mock sign-in and sign-out function.
Scalable solution to users.
*/

import React, { createContext, useContext, useState } from 'react';

// Create the UserContext and defaultUser
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // State to hold user information (null if not signed in)
  const [user, setUser] = useState(null);

  // Mock sign-in function
  const signIn = (username) => {
    setUser({ user: username });
  };

  // Sign-out function
  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Export
export const useUser = () => useContext(UserContext);
