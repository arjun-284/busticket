import { Booking } from '../../models/BookingModel.js';

export const index = async (req, res) => {
   try {
      const userId = req.user.id;
      const totalBooking = await Booking.find({ userId }).countDocuments();
      return res.status(200).json({
         totalBooking
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const booking = async (req, res) => {
   try {
      const userId = req.user.id;
      const booking = await Booking.find({ userId });
      return res.status(200).json({
         data: booking
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};