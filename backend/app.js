import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http'; // for creating server
import { Server } from 'socket.io'; // for real-time communication

import { PORT, mongoDBURL } from './config/config.js';
import adminRoutes from './routes/AdminRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import homeRoutes from './routes/HomeRoutes.js';
import clientRoutes from './routes/ClientRoutes.js';
import errorHandler from './utils/errorHandler.js';

import { runNotificationJob } from './jobs/NotificationCron.js'; // cron job function
import locationRoutes from './routes/LocationRoutes.js';


const app = express();
const server = http.createServer(app);

// Enable Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});
global.io = io;
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'https://rc-epay.esewa.com.np'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route groups (keep order: most specific last)
app.use('/api', homeRoutes);
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);      // /api/admin/* (includes bus routes)
app.use('/api/user', clientRoutes);
app.use('/api/locations', locationRoutes);
app.use('/uploads', express.static('uploads'));

// Global error handler
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`App is running on PORT: ${PORT}`);
    });
    runNotificationJob();
  })
  .catch((error) => {
    console.error('App cannot connect to the database:', error);
  });

export default app;
