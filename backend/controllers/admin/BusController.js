import mongoose from 'mongoose';
import { Bus } from '../../models/BusModel.js';
import { Location } from '../../models/LocationModel.js';
import { validateBusFields } from '../../utils/validateFields.js';

// Function to get all locations
export const getAllLocations = async (req, res) => {
   try {
      const locations = await Location.find({});
      return locations;
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const allLocations = async (req, res) => {
   try {
      const locations = await getAllLocations(req, res);
      return res.status(200).json(locations);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}


export const create = async (req, res) => {
   try {
      const { title, price, passenger, from, to, bus_number, departure_date, renew_date } = req.body;

      if (!validateBusFields(req.body)) {
         return res.status(400).json({ message: 'All fields are required' });
      }
      // Validate that from and to are valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
         return res.status(400).json({ message: 'Invalid from or to location ID' });
      }
      const newBus = { title, price, passenger, from, to, bus_number, departure_date, renew_date };

      const bus = await Bus.create(newBus);
      return res.status(201).json(bus);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const show = async (req, res) => {
   try {
      const buses = await Bus.find({})
         .populate('from', 'name')
         .populate('to', 'name');
      const locations = await getAllLocations(req, res);
      return res.status(200).json({
         data: buses,
         locations: locations
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const edit = async (req, res) => {
   try {
      const bus = await Bus.findById(req.params.id);
      if (!bus) {
         return res.status(404).json({ message: 'Bus not found' });
      }
      return res.status(200).json(bus);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const update = async (req, res) => {
   try {
      const { id } = req.params;
      const updatedBus = req.body;

      if (!validateBusFields(updatedBus)) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      const { from, to } = updatedBus;
      
      // Validate that from and to are valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
         return res.status(400).json({ message: 'Invalid from or to location ID' });
      }

      const bus = await Bus.findByIdAndUpdate(id, updatedBus, { new: true });

      if (!bus) {
         return res.status(404).json({ message: 'Bus not found' });
      }

      return res.status(200).json(bus);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndDelete(id);

      if (!bus) {
         return res.status(404).json({ message: 'Bus not found' });
      }
      return res.status(200).json({ message: 'Bus deleted successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

// Function to create or update a location
export const upsertLocation = async (req, res) => {
   try {
      const { id, location } = req.body;

      if (!location) {
         return res.status(400).json({ message: 'Location is required' });
      }

      let savedLocation;
      if (id) {
         // Update existing location
         savedLocation = await Location.findByIdAndUpdate(
            id,
            { name: location },
            { new: true }
         );

         if (!savedLocation) {
            return res.status(404).json({ message: 'Location not found' });
         }
      } else {
         // Create new location
         savedLocation = new Location({ name: location });
         await savedLocation.save();
      }

      const locations = await getAllLocations(req, res);
      return res.status(200).json({ locations });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const deleteLocation = async (req, res) => {
   try {
      const { id } = req.params;
      const location = await Location.findByIdAndDelete(id);

      if (!location) {
         return res.status(404).json({ message: 'Location not found' });
      }
      return res.status(200).json({ message: 'Location deleted successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}