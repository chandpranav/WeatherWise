import React, { useState } from 'react';
import { useUser } from './UserContext'; // Import the custom hook
import './styles/style.css';

const cities = ['Los Angeles', 'Moscow', 'London', 'Hanoi', 'Beijing', 'Seoul', 'Osaka', 'Tokyo', 'Kyoto', 'Sydney', 'New York', 'Singapore'];

function WeatherApp() {
  const { user, favoriteLocation } = useUser(); // Access user and favoriteLocation
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [historyMessage, setHistoryMessage] = useState('');

  const clearHistory = () => {
    setSearchHistory([]); // Clear the search history
    setHistoryMessage(''); // Clear any history message
  };

  const fetchWeather = async (city) => {
    clearHistory(); // Clear history when fetching new weather
    const query = city || location;

    if (!query) {
      setError('Please enter a valid location');
      return;
    }

    const username = user?.user || "guest";
    const url = `http://localhost:5001/weather/api/getweather?location=${query}&user=${username}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error); // Print the error sent by the backend
      } else {
        const celsius = data.temperatureC;
        const fahrenheit = data.temperatureF;
        setWeatherData({
          name: data.name,
          temperature: `${Math.round(celsius)}°C / ${Math.round(fahrenheit)}°F`,
          description: data.description,
        });
        setError(''); // Clear any previous error
      }
    } catch (error) {
      setError('Error fetching weather data. Please try again later.');
    }
  };

  const resetWeather = () => {
    clearHistory(); // Clear history when resetting
    setLocation('');
    setWeatherData(null);
    setError('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  const fetchRandomWeather = () => {
    clearHistory(); // Clear history when fetching random weather
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    fetchWeather(randomCity);
  };

  const fetchFavoriteWeather = () => {
    clearHistory(); // Clear history when fetching favorite location weather
    if (favoriteLocation) {
      fetchWeather(favoriteLocation);
    }
  };

  const fetchUserHistory = async () => {
    if (!user) {
      setHistoryMessage('Please log in to view search history.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/weather/api/history?user=${user.user}`);
      const data = await response.json();

      if (data.length > 0) {
        setSearchHistory(data); // Store the search history
        setHistoryMessage(''); // Clear any previous message
      } else {
        setSearchHistory([]);
        setHistoryMessage('No previous searches found.');
      }
    } catch (error) {
      console.error('Error fetching search history:', error);
      setHistoryMessage('Failed to fetch search history. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>WeatherWise</h1>
      <input
        type="text"
        id="locationInput"
        placeholder="Enter a city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown} // Listen for keydown events
      />
      <button className="resetBtn" onClick={resetWeather}>Reset</button>
      <button onClick={() => fetchWeather()}>Search</button>
      <button className="randomizeBtn" onClick={fetchRandomWeather}>Randomize</button>

      {/* Display Favorite Location button */}
      {user && favoriteLocation && (
        <button className="favoriteBtn" onClick={fetchFavoriteWeather}>
          Favorite Location: {favoriteLocation || "None"}
        </button>
      )}

      {/* Place the View Search History button below Favorite Location */}
      {user && (
        <button className="historyBtn" onClick={fetchUserHistory}>
          View Search History
        </button>
      )}

      <p className="errorMessage">{error}</p>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.temperature}</p>
          <p>{weatherData.description}</p>
        </div>
      )}
      {historyMessage && <p className="errorMessage">{historyMessage}</p>}
      {searchHistory.length > 0 && (
        <ul className="historyList">
          {searchHistory.map((search, index) => (
            <li key={index}>
              {search.location} - {new Date(search.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WeatherApp;
