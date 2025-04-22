import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http'; // for creating server
import { Server } from 'socket.io'; // for real-time communication

import { PORT, mongoDBURL } from './config/config.js';
import { adminRoutes } from './routes/AdminRoutes.js';
import { authRoutes } from './routes/AuthRoutes.js';
import { homeRoutes } from './routes/HomeRoutes.js';
import { clientRoutes } from './routes/ClientRoutes.js';
import { errorHandler } from './utils/errorHandler.js';

import { runNotificationJob } from './jobs/NotificationCron.js'; // cron job function

const app = express();
const server = http.createServer(app); // create HTTP server for Socket.IO

// Enable Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

global.io = io; // Make io globally available

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://rc-epay.esewa.com.np'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route groups
app.use('/api', homeRoutes);
app.use('/api', authRoutes); // login/register
app.use('/api/admin', adminRoutes);
app.use('/api/user', clientRoutes);
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    server.listen(PORT, '0.0.0.0', () => { // start HTTP server instead of app
      console.log(`App is running on PORT: ${PORT}`);
    });

    // Start notification cron job
    runNotificationJob();
  })
  .catch((error) => {
    console.error('App cannot connect to the database:', error);
  });
