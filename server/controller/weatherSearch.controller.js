import Search from "../model/search.js";
import { fetchWeatherData } from "../services/weatherAPI.service.js";
import { saveSearchToDatabase } from "../services/savesearch.service.js";

// Get the last 10 searches
export const getSearches = async (req, res) => {
    try {
        const searches = await Search.find()
            .sort({ timestamp: -1 }) // Sort by most recent
            .limit(10); // Get the last 10 searches
        res.status(200).json(searches);
    } catch (err) {
        console.error('Failed to fetch searches:', err);
        res.status(500).json({
            status: "Fail",
            message: "Failed to get searches."
        });
    }
};

// Get the weather
export const getWeather = async (req, res) => {
    const query = req.query.location;
    const user = req.query.user;
    
    if (!query) {
        return res.status(400).json({ error: 'Enter a valid city or location.' });
    } 

    try {
        const weatherData = await fetchWeatherData(query);

        saveSearchToDatabase(
            user,
            query, 
            Math.round(weatherData.temperatureC),
            Math.round(weatherData.temperatureF),
            weatherData.description
        ).catch(err => {
            console.error('Error saving search to database:', err);
        });

        res.json(weatherData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
