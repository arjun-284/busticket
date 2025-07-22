import express from 'express';
import multer from 'multer';
import {
  create,
  update,
  show,
  edit,
  destroy,
  allLocations, // Ensure this maps to the correct function for fetching all locations
  upsertLocation,
  deleteLocation,
} from '../controllers/admin/BusController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '')}`),
});
const upload = multer({ storage });

router.post('/bus/create', upload.single('image'), create);
router.put('/bus/update/:id', upload.single('image'), update);

router.get('/bus', show);
router.get('/bus/:id', edit);
router.delete('/bus/:id', destroy);

router.get('/locations', allLocations); // THIS IS THE ROUTE FOR FETCHING ALL LOCATIONS
router.post('/location', upsertLocation); // This handles adding (and potentially updating) a single location
router.delete('/location/:id', deleteLocation);

export default router;