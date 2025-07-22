import mongoose from 'mongoose';
import { Bus } from '../../models/BusModel.js';
import { Location } from '../../models/LocationModel.js';

export const create = async (req, res) => {
  try {
    // console.log("Create Bus - BODY:", req.body); // Keep for debugging if needed
    // console.log("Create Bus - FILE:", req.file); // Keep for debugging if needed

    const image = req.file ? req.file.filename : null;

    let amenities = {};
    if (req.body.amenities) {
      try {
        amenities = JSON.parse(req.body.amenities);
      } catch (e) {
        return res.status(400).json({ message: "Invalid amenities format. Amenities must be a valid JSON string." });
      }
    }

    const {
      title, owner, price, passenger, from, to,
      bus_number, type, departure_date, renew_date, insurance_renew_date
    } = req.body;

    // --- Backend Validation for required fields ---
    const requiredFields = {
      title, owner, price, passenger, from, to,
      bus_number, type, departure_date, renew_date, insurance_renew_date
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, val]) => {
        // For string fields, check if trimmed value is empty
        if (typeof val === 'string') {
          return val.trim() === '';
        }
        // For other types (numbers, IDs), check for falsy values (null, undefined, 0 for numbers if 0 is not valid)
        // Note: For 'price' and 'passenger', we'll do numeric validation separately
        return !val;
      })
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // --- Numeric Type Validation and Conversion ---
    const numPrice = Number(price);
    const numPassenger = Number(passenger);

    if (isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({ message: "Price must be a positive number." });
    }
    if (isNaN(numPassenger) || numPassenger <= 0) {
        return res.status(400).json({ message: "Passenger capacity must be a positive number." });
    }

    // --- MongoDB ObjectId Validation ---
    if (!mongoose.Types.ObjectId.isValid(from)) {
      return res.status(400).json({ message: 'Invalid "From" location ID format.' });
    }
    if (!mongoose.Types.ObjectId.isValid(to)) {
        return res.status(400).json({ message: 'Invalid "To" location ID format.' });
    }

    const newBus = {
      title: title.trim(),
      owner: owner.trim(),
      price: numPrice, // Use converted numbers
      passenger: numPassenger, // Use converted numbers
      from,
      to,
      bus_number: bus_number.trim(),
      type: type.trim(),
      image,
      amenities,
      departure_date,
      renew_date,
      insurance_renew_date
    };

    const bus = await Bus.create(newBus);
    return res.status(201).json(bus);
  } catch (error) {
    console.error('Bus creation failed:', error);
    if (error.code === 11000) { // Duplicate key error (e.g., for bus_number if unique)
        return res.status(409).json({ message: "Bus number already exists. Please use a unique bus number." });
    }
    // Mongoose validation errors (e.g., if a field type is wrong and not caught by initial checks)
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    return res.status(500).json({ message: error.message || 'Internal server error during bus creation.' });
  }
};

export const allLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    // This should always return 200 OK for GET requests to fetch data
    return res.status(200).json({ locations });
  } catch (error) {
    console.error('Failed to fetch all locations:', error);
    return res.status(500).json({ message: error.message || 'Error fetching locations.' });
  }
};

export const show = async (req, res) => {
  try {
    const buses = await Bus.find({})
      .populate('from', 'name')
      .populate('to', 'name');
    const locations = await Location.find({}); // Still keeping this for completeness as per your original code
    return res.status(200).json({
      data: buses,
      locations // This might not be needed here if it's always fetched separately
    });
  } catch (error) {
    console.error('Failed to show buses:', error);
    return res.status(500).json({ message: error.message || 'Error fetching buses.' });
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
    console.error('Failed to edit bus:', error);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid Bus ID format.' });
    }
    return res.status(500).json({ message: error.message || 'Internal server error fetching bus for edit.' });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedFields = req.body;

    // console.log("Update Bus - BODY:", req.body); // Debugging
    // console.log("Update Bus - FILE:", req.file); // Debugging

    if (updatedFields.amenities) {
      try {
        updatedFields.amenities = JSON.parse(updatedFields.amenities);
      } catch (e) {
        return res.status(400).json({ message: "Invalid amenities format. Amenities must be a valid JSON string." });
      }
    }

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    // Validate ID formats for 'from' and 'to' if they are provided in the update
    if (updatedFields.from && !mongoose.Types.ObjectId.isValid(updatedFields.from)) {
      return res.status(400).json({ message: 'Invalid "From" location ID format.' });
    }
    if (updatedFields.to && !mongoose.Types.ObjectId.isValid(updatedFields.to)) {
      return res.status(400).json({ message: 'Invalid "To" location ID format.' });
    }

    // Convert price and passenger to numbers if they are being updated and validate
    if (updatedFields.price !== undefined) {
        const numPrice = Number(updatedFields.price);
        if (isNaN(numPrice) || numPrice <= 0) {
            return res.status(400).json({ message: "Price must be a positive number." });
        }
        updatedFields.price = numPrice;
    }
    if (updatedFields.passenger !== undefined) {
        const numPassenger = Number(updatedFields.passenger);
        if (isNaN(numPassenger) || numPassenger <= 0) {
            return res.status(400).json({ message: "Passenger capacity must be a positive number." });
        }
        updatedFields.passenger = numPassenger;
    }

    // Trim string fields if they are updated
    if (typeof updatedFields.title === 'string') updatedFields.title = updatedFields.title.trim();
    if (typeof updatedFields.owner === 'string') updatedFields.owner = updatedFields.owner.trim();
    if (typeof updatedFields.bus_number === 'string') updatedFields.bus_number = updatedFields.bus_number.trim();
    if (typeof updatedFields.type === 'string') updatedFields.type = updatedFields.type.trim();


    const bus = await Bus.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true }); // `new: true` returns the updated doc, `runValidators: true` applies schema validators
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    return res.status(200).json(bus);
  } catch (error) {
    console.error('Bus update failed:', error);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid Bus ID format.' });
    }
    if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ message: "Bus number already exists. Please use a unique bus number." });
    }
    if (error.name === 'ValidationError') { // Mongoose validation errors
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    return res.status(500).json({ message: error.message || 'Internal server error during bus update.' });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { // Validate ID format before DB query
      return res.status(400).json({ message: 'Invalid Bus ID format.' });
    }
    const bus = await Bus.findByIdAndDelete(id);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    return res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Bus deletion failed:', error);
    return res.status(500).json({ message: error.message || 'Internal server error during bus deletion.' });
  }
};

// This function also handles update if 'id' is provided in the body
export const upsertLocation = async (req, res) => {
  try {
    const { id, location } = req.body;

    // Basic validation for location name
    if (!location || typeof location !== 'string' || location.trim() === '') {
      return res.status(400).json({ message: 'Location name is required and must be a non-empty string.' });
    }

    let savedLocation;
    if (id) {
      // If ID is provided, it's an update. Validate ID format.
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Location ID format.' });
      }
      savedLocation = await Location.findByIdAndUpdate(
        id,
        { name: location.trim() },
        { new: true, runValidators: true } // `runValidators` ensures schema validators apply on update
      );
      if (!savedLocation) {
        return res.status(404).json({ message: 'Location not found.' });
      }
    } else {
      // If no ID, it's a creation
      savedLocation = new Location({ name: location.trim() });
      await savedLocation.save();
    }
    
    // After successful upsert, fetch all locations to return updated list
    const locations = await Location.find({});
    return res.status(200).json({ locations }); // Always return 200 OK for upsert that returns list
  } catch (error) {
    console.error('Location upsert failed:', error); // THIS IS THE KEY TO DEBUG THE 500 ERROR
    if (error.code === 11000) { // MongoDB duplicate key error (for unique `name` field in LocationModel)
        return res.status(409).json({ message: `Location '${req.body.location}' already exists. Please choose a unique name.` });
    }
    if (error.name === 'ValidationError') { // Mongoose validation errors
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    // Generic server error for any other unhandled exception
    return res.status(500).json({ message: error.message || 'Internal server error during location operation.' });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Location ID format.' });
    }
    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    return res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Location deletion failed:', error);
    return res.status(500).json({ message: error.message || 'Internal server error during location deletion.' });
  }
};