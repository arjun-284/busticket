import express from 'express';
import multer from 'multer';
import * as busController from '../controllers/admin/BusController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/buses/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Bus endpoints
router.post('/admin/bus/create', upload.single('image'), busController.create);
router.put('/admin/bus/update/:id', upload.single('image'), busController.update);
router.get('/admin/bus', busController.show);
router.delete('/admin/bus/:id', busController.destroy);

export default router;
