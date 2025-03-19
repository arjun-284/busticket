import { Bus } from '../models/BusModel.js';

export const home = async (req, res) => {
   try {
      const buses = await Bus.find({});
      return res.status(200).json({
         buses
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}