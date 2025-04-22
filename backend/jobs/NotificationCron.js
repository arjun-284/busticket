import cron from 'node-cron';
import { Bus } from '../models/BusModel.js';

// This function Every hours every day 
export const runNotificationJob = () => {
   cron.schedule('0 * * * *', async () => {  //'0 * * * *', change this as per need
     try {
       // Get today's date in YYYY-MM-DD format
       const today = new Date().toISOString().split('T')[0];
 
       // Convert to start and end of today for precise comparison
       const startOfToday = new Date(today);
       const endOfToday = new Date(startOfToday.getTime() + 86400000);
 
       // Find buses that need renewal today
       const busesDueToday = await Bus.find({
         renew_date: {
           $gte: startOfToday,
           $lt: endOfToday,
         }
       });
 
       // If any buses are due for renewal, send socket notification
       if (busesDueToday.length > 0 && global.io) {
         // Prepare a message
         const message = `There are ${busesDueToday.length} bus(es) that need renewal today.`;
 
         // Emit to all connected users; frontend will filter by role
         global.io.emit('renewal-alert', {
           message,
           buses: busesDueToday, // you can send more detailed data if needed
         });
       }else{
         global.io.emit('renewal-alert', {
            message: `No buses need renewal today.`,
          });
       }
     } catch (error) {
       console.error('Error in cron job:', error);
     }
   });
 };
