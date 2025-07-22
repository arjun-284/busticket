import { Location } from '../models/LocationModel.js';

export const createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Location name is required' });
    const location = new Location({ name });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create location', error: error.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json({ locations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const location = await Location.findByIdAndUpdate(id, { name }, { new: true });
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update location', error: error.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete(id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete location', error: error.message });
  }
};
