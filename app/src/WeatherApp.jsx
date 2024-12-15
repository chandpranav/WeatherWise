import React, { useState } from 'react';
import { useUser } from './UserContext'; // Import the custom hook
import './styles/style.css';

const cities = ['Los Angeles', 'Moscow', 'London', 'Hanoi', 'Beijing', 'Seoul', 'Osaka', 'Tokyo', 'Kyoto', 'Sydney', 'New York', 'Singapore'];

function WeatherApp() {
  const { user, favoriteLocation } = useUser(); // Access user and favoriteLocation
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    const query = city || location;

    console.log(user)

    if (!query) {
      setError('Please enter a valid location');
      return;
    }

    console.log(user?.user);

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

  // Reset weather data
  const resetWeather = () => {
    setLocation('');
    setWeatherData(null);
    setError('');
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  // Fetch weather for a random city from the cities array
  const fetchRandomWeather = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    fetchWeather(randomCity);
  };

  // Fetch weather for the user's favorite location
  const fetchFavoriteWeather = () => {
    if (favoriteLocation) {
      fetchWeather(favoriteLocation);
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
      {/* Add a button to search favorite location if user is signed in and favoriteLocation exists */}
      {user && favoriteLocation && (
        <button className="favoriteBtn" onClick={fetchFavoriteWeather}>
          Favorite Location: {favoriteLocation || "None"}
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
    </div>
  );
}

export default WeatherApp;
