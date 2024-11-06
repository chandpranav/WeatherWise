// server/server.js
import express from 'express';
import mongoose from 'mongoose';

import { setupCors } from './middleware/cors.middleware.js';
import weatherSearchRoute from "./routes/weatherSearchRoute.js";

import dotenv from 'dotenv';

// Initialize express app
const app = express();
app.use(express.json());

// Global Middleware
setupCors(app);

// Access env variables
dotenv.config();

// MongoDB connection
const mongoURL = process.env.MONGODB_URL;
const mongoConnect = async () => {
    try {
      await mongoose.connect(mongoURL); 
      console.log("DB connected");
    } catch (err) {
      console.error("DB connection error:", err);
    }
};

//Define routes for weatherSearches
app.use("/weather", weatherSearchRoute);

// Start the server and connect to the database
const startServer = async () => {
  await mongoConnect(); // Connect to MongoDB
  app.listen(5001, () => {
    console.log("Server started on port 5001");
  });
};

//Start the Server
startServer();