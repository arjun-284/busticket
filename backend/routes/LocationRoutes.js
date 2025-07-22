import express from 'express';
import { protect } from '../middleware/AuthMiddleware.js';
import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation
} from '../controllers/LocationController.js';

const router = express.Router();

router.get('/', protect, getLocations);         // GET /api/locations
router.post('/', protect, createLocation);      // POST /api/locations
router.put('/:id', protect, updateLocation);    // PUT /api/locations/:id
router.delete('/:id', protect, deleteLocation); // DELETE /api/locations/:id

export default router;
