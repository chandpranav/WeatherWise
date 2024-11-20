import Search from "../model/search.js";
import { fetchWeatherData } from "../services/weatherAPI.service.js";
import { saveSearchToDatabase } from "../services/savesearch.service.js";
import { getUserHistory } from "../services/getuserhistory.service.js";

// Get the last 10 searches
export const getHistory = async (req, res) => {
    const user = req.query.user;

    const history = await getUserHistory(user);
    console.log(`History for ${user} fetched: `, history);
    res.json(history);
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
