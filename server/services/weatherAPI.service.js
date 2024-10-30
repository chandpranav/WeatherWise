// Load environment variables from .env file
import dotenv from 'dotenv';

dotenv.config();

// Access API
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
  

// Function to fetch weather data from OpenWeather API
export async function fetchWeatherData(location) {
    // URL
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        return {
          name: data.name,
          temperatureC: data.main.temp,
          temperatureF: (data.main.temp * 9) / 5 + 32,
          description: data.weather[0].description,
        };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      throw new Error('Error fetching weather data');
    }
  }