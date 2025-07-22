import express from 'express';
import { authorize } from '../middleware/AuthMiddleware.js';
import multer from 'multer';
import {
  create,
  update,
  show,
  edit,
  destroy,
  allLocations,
  upsertLocation,
  deleteLocation,
} from '../controllers/admin/BusController.js';

const router = express.Router();

// Configure multer for file uploads
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

console.log('🚀 BusRoutes.js loaded - multer configured');

router.post('/create', authorize('admin', 'manager'), (req, res, next) => {
  console.log('🔧 About to call multer middleware');
  next();
}, upload.single('image'), (req, res, next) => {
  console.log('🔧 After multer, req.body:', req.body);
  console.log('🔧 After multer, req.file:', req.file);
  next();
}, create);
router.get('/show', authorize('admin', 'manager', 'staff'), show);
router.get('/edit/:id', authorize('admin', 'manager'), edit);
router.put('/update/:id', authorize('admin', 'manager'), upload.single('image'), update);
router.delete('/delete/:id', authorize('admin'), destroy);
router.get('/location', authorize('admin', 'manager'), allLocations);
router.post('/location', authorize('admin', 'manager'), upsertLocation);
router.delete('/location/:id', authorize('admin', 'manager'), deleteLocation);



export const busRoutes = router;
