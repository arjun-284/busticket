import express from 'express';
import multer from 'multer';
import { protect, authorize } from '../middleware/AuthMiddleware.js';
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

// Apply authentication to all routes
router.use(protect);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('📁 Multer destination called');
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log('📄 Multer filename called for:', file.originalname);
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''))
  }
})

const upload = multer({ storage: storage });

// Add multer error handling middleware
const multerErrorHandler = (error, req, res, next) => {
  console.log('Multer error:', error);
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large' });
    }
  }
  next(error);
};

router.post('/bus/create', authorize('admin', 'manager'), (req, res, next) => {
  console.log('🔧 Bus create route hit');
  console.log('Content-Type:', req.headers['content-type']);
  next();
}, upload.single('image'), (req, res, next) => {
  console.log('🔧 After multer middleware');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  next();
}, create);
router.put('/bus/update/:id', authorize('admin', 'manager'), upload.single('image'), update);

router.get('/bus', authorize('admin', 'manager', 'staff'), show);
router.get('/bus/:id', authorize('admin', 'manager'), edit);
router.delete('/bus/:id', authorize('admin'), destroy);

router.get('/locations', authorize('admin', 'manager', 'staff'), allLocations); // THIS IS THE ROUTE FOR FETCHING ALL LOCATIONS
router.post('/location', authorize('admin', 'manager'), upsertLocation); // This handles adding (and potentially updating) a single location
router.delete('/location/:id', authorize('admin', 'manager'), deleteLocation);

export default router;