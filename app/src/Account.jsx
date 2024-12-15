import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Account() {
  const { user, signOut } = useUser(); // Access user and signOut function
  const navigate = useNavigate();
  const [favoriteLocation, setFavoriteLocation] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFavoriteLocation();
  }, []);

  const fetchFavoriteLocation = async () => {
    if (!user) return;
    console.log(user.user);
    try {
      const response = await fetch(`http://localhost:5001/user/getfavorite?user=${user.user}`);
      const data = await response.json();
      setFavoriteLocation(data.favoriteLocation || 'None');
    } catch (error) {
      console.error("Error fetching favorite location:", error);
      setErrorMessage('Failed to load favorite location.');
    }
  };

  const updateFavoriteLocation = async () => {
    if (!locationInput) {
      setErrorMessage('Please enter a valid location.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/user/setfavorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.user, favoriteLocation: locationInput }),
      });
      const data = await response.json();
      if (response.ok) {
        setFavoriteLocation(data.favorite?.favoriteLocation || locationInput);
        setMessage('Favorite location updated successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to update favorite location.');
      }
    } catch (error) {
      console.error("Error updating favorite location:", error);
      setErrorMessage('Failed to update favorite location.');
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
        console.log(`Deleteing account for ${user.user}`)
        const response = await fetch(`http://localhost:5001/user/delete`, {
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
            <p>Current Favorite Location: <strong>{favoriteLocation}</strong></p>
            <input
              type="text"
              placeholder="Enter a new favorite location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <button onClick={updateFavoriteLocation}>Set Favorite</button>
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
