// middleware/cors.js
import cors from 'cors';

// CORS configuration
const corsOptions = {
  origin: '*', // all origins
};

export const setupCors = (app) => {
  app.use(cors(corsOptions));
};
