import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config/config.js';
import { busRoutes } from './routes/BusRoutes.js';
import { authRoutes } from './routes/AuthRoutes.js';

import { errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//routes list 
app.use('/api', authRoutes);
app.use('/api/buses', busRoutes);
app.use(errorHandler);

mongoose.connect(mongoDBURL).then(() => {
  console.log('App Connect to the database');
  app.listen(PORT, () => {
    console.log(`App is running in PORT : ${PORT}`);
  });
}).catch((error) => {
  console.error(error,'App Cannot Connect To database');
});