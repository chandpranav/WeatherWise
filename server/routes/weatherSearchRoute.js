import { Router } from "express";
import {
  getSearches,
  getWeather,
} from "../controller/weatherSearch.controller.js"; // Import controller functions

const weatherSearchRoute = Router();

// Define all the routes for user-related operations
weatherSearchRoute.get('/api/searches', getSearches); // Get saved searches
weatherSearchRoute.get('/api/getweather', getWeather); // Fetch weather

export default weatherSearchRoute;