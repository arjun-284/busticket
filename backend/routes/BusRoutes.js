import express from 'express';
import { authorize } from '../middleware/AuthMiddleware.js';
import { create, show, edit, update, destroy, allLocations, upsertLocation, deleteLocation } from '../controllers/admin/BusController.js';

const router = express.Router();

router.post('/create', authorize('admin', 'manager'), create);
router.get('/show', authorize('admin', 'manager', 'staff'), show);
router.get('/edit/:id', authorize('admin', 'manager'), edit);
router.put('/update/:id', authorize('admin', 'manager'), update);
router.delete('/delete/:id', authorize('admin'), destroy);
router.get('/location', authorize('admin', 'manager'), allLocations);
router.post('/location', authorize('admin', 'manager'), upsertLocation);
router.delete('/location/:id', authorize('admin', 'manager'), deleteLocation);

export const busRoutes = router;
