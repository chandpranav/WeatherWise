import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const BASE_URL = import.meta.env.VITE_API_URL;

function Account() {
  const { user, favoriteLocation, updateFavoriteLocation, signOut } = useUser();
  const navigate = useNavigate();
  const [locationInput, setLocationInput] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (favoriteLocation) {
      setLocationInput(favoriteLocation); // Prefill input with the current favorite location
    }
  }, [favoriteLocation]);

  const handleUpdateFavoriteLocation = async () => {
    if (!locationInput) {
      setErrorMessage('Please enter a valid location.');
      return;
    }
    try {
      await updateFavoriteLocation(user.user, locationInput); // Call context method
      setMessage('Favorite location updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error("Error updating favorite location:", error);
      setErrorMessage('Failed to update favorite location.');
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      console.log(`Deleting account for ${user.user}`);
      const response = await fetch(`${BASE_URL}/user/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.user }),
      });
      if (response.ok) {
        signOut(); // Log the user out after deleting the account
        navigate('/'); // Redirect to the home page
      } else {
        setErrorMessage('Failed to delete account.');
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMessage('Failed to delete account.');
    }
  };

  return (
    <div className="container">
      <h1>Account Settings</h1>
      {user ? (
        <>
          <h3>Welcome, {user.user}!</h3>
          <div>
            <p>Current Favorite Location: <strong>{favoriteLocation || 'None'}</strong></p>
            <input
              type="text"
              placeholder="Enter a new favorite location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <button onClick={handleUpdateFavoriteLocation}>Set Favorite</button>
          </div>
          <button onClick={deleteAccount} style={{ backgroundColor: '#ef2929', marginTop: '15px' }}>
            Delete Account
          </button>
          {message && <p className="successMessage">{message}</p>}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </>
      ) : (
        <p>Please log in to manage your account.</p>
      )}
    </div>
  );
}

export default Account;
