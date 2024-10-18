import { Router } from "express";
import {
  getSearches,
  saveSearch,
} from "../controller/weatherSearch.controller.js"; // Import controller functions

const weatherSearchRoute = Router();

// Define all the routes for user-related operations
weatherSearchRoute.get('/api/searches', getSearches); // get saved searches
weatherSearchRoute.post('/api/search', saveSearch); // save the search

export default weatherSearchRoute;