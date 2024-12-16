// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';

import { setupCors } from './middleware/cors.middleware.js';
import { deleteOldSearches } from './services/cleanup.service.js';
import weatherSearchRoute from "./routes/weatherSearch.route.js";
import userRoute from './routes/user.route.js';

// Initialize express app
const app = express();
app.use(express.json());

// Global Middleware
setupCors(app);

// Access env variables
dotenv.config();

// Cleanup Service
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled cleanup for old searches...');
  try {
    await deleteOldSearches();
    console.log('Scheduled cleanup completed successfully.');
  } catch (error) {
    console.error('Error during scheduled cleanup:', error);
  }
});

// MongoDB connection
const mongoURL = process.env.MONGODB_URL;
const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log(`Connected to database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Define routes
app.use("/weather", weatherSearchRoute);
app.use("/user", userRoute);

// Start the server and connect to the database
const startServer = async () => {
  await mongoConnect(); // Connect to MongoDB
  const PORT = process.env.PORT || 5002; 
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

// Start the Server
startServer();
