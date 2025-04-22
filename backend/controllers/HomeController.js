import mongoose from 'mongoose';
import crypto from 'crypto';
import { Bus } from '../models/BusModel.js';
import { Booking } from '../models/BookingModel.js';
import { getAllLocations } from './admin/BusController.js';

var allData = {};

export const locations = async (req, res) => {
   try {
      // Fetch all locations from the database
      const locations = await getAllLocations(req, res);
      // Return the locations as a JSON response
      return res.status(200).json({
         locations
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

export const home = async (req, res) => {
   try {
      // Extract form data from the request body
      const { from, to, date, passenger } = req.body;

      // Validate required fields
      if (!from || !to || !date || !passenger) {
         return res.status(400).json({ message: 'All fields (from, to, date, passenger) are required' });
      }

      // Convert passengers to a number and validate
      const passengerCount = parseInt(passenger, 10);
      if (isNaN(passengerCount) || passengerCount <= 0) {
         return res.status(400).json({ message: 'Number of passengers must be a positive integer' });
      }

      //extract data using relation id
      const fromId = new mongoose.Types.ObjectId(from);
      const toId = new mongoose.Types.ObjectId(to);

      // Query the database for buses matching the criteria
      const buses = await Bus.find({
         from: fromId,
         to: toId,
         departure_date: date,
         passenger: { $gte: passengerCount }
      }).populate('from', 'name').populate('to', 'name');

      // Return the filtered buses
      return res.status(200).json({
         buses
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const booking = async (req, res) => {
   try {
      const { fullName, email, passenger, totalPrice, totalSeat, paymentMethod, busId, busTitle, date, from, to, bus_number, guest, userId } = req.body;
      const seat = await Booking.find({
         from: from,
         to: to,
         date: date,
         busId: busId
      });

      const bookedSeat = seat.map(seat => parseInt(seat.passenger)).reduce((acc, curr) => acc + curr, 0);
      const totalSeatAvailable = parseInt(passenger) + parseInt(bookedSeat);
      if (parseInt(totalSeatAvailable) > parseInt(totalSeat)) {
         return res.status(400).json({ message: 'Not enough seats available' });
      }

      const newBooking = new Booking({
         fullName,
         email,
         passenger,
         totalPrice,
         paymentMethod,
         busId,
         busTitle,
         date,
         from,
         to,
         bus_number,
         guest,
         userId
      });
      await newBooking.save();

      return res.json({
         message: 'Booking successful',
         newBooking
      });

   } catch (error) {
      return res.status(500).json({ message: error.message });

   }
}


const generateSignature = (params) => {
   // Create HMAC using SHA256 and update it with the data.
   const secretKey = "8gBm/:&EnhH.1/q";
   const hmac = crypto.createHmac('sha256', secretKey);
   hmac.update(params);

   // Digest the hash to Base64 string.
   return hmac.digest('base64');
};

export const initiateEsewaPayment = async (req, res) => {
   try {
      allData = req.body;
      const { total_amount, transaction_uuid, product_code, signed_field_names } = req.body;
      const formData = { total_amount, transaction_uuid, product_code, signed_field_names };
      const fields = signed_field_names.split(',');
      const dataToSign = fields
         .map(field => `${field}=${formData[field]}`)
         .join(',');
      const signature = generateSignature(dataToSign);
      return res.status(200).json({
         signature
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }

}

export const esewaSuccess = async (req, res) => {
   try {
      const { data } = req.query;
      const decodeData = JSON.parse(
         Buffer.from(data, "base64").toString("utf-8")
      );

      const newBooking = new Booking({
         fullName: allData.fullName,
         email: allData.email,
         passenger: allData.passenger,
         totalPrice: allData.totalPrice,
         paymentMethod: "esewa",
         busId: allData.busId,
         busTitle: allData.busTitle,
         date: allData.date,
         from: allData.from,
         to: allData.to,
         bus_number: allData.bus_number,
         guest: allData.guest,
         userId: allData.userId
      });
      await newBooking.save();
      const id = newBooking._id;
      return res.redirect(`http://localhost:5173/invoice?id=${id}`);

   } catch (error) {
      console.error("eSewa Verification Error:", error);
      return res.status(500).json({ message: "Payment verification failed" });
   }
};

export const esewaFailure = (req, res) => {
   return res.status(500).json({ message: "Payment verification failed" });
};

export const invoiceData = async (req, res) => {
   try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
         return res.status(404).json({ message: 'booking not found' });
      }
      return res.status(200).json(booking);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
