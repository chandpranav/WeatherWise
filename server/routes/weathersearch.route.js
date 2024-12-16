import { Router } from "express";
import {
  getHistory,
  getWeather,
} from "../controller/weathersearch.controller.js"; // Import controller functions

const weatherSearchRoute = Router();

// Define all the routes for user-related operations
weatherSearchRoute.get('/api/history', getHistory); // Get saved searches
weatherSearchRoute.get('/api/getweather', getWeather); // Fetch weather

export default weatherSearchRoute;