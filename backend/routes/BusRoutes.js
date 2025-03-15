import express from 'express';
import { authorize } from '../middleware/AuthMiddleware.js';
import { create, show, edit, update, destroy } from '../controllers/admin/BusController.js';

const router = express.Router();

router.post('/create', authorize('admin', 'manager'), create);
router.get('/show', authorize('admin', 'manager', 'staff'), show);
router.get('/edit/:id', authorize('admin', 'manager'), edit);
router.put('/update/:id', authorize('admin', 'manager'), update);
router.delete('/delete/:id', authorize('admin'), destroy);

export const busRoutes = router;
