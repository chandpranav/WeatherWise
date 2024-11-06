import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './UserContext'; // Import UserProvider

// Adding UserProvider to access the user across the app. Unecessary but fun.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);