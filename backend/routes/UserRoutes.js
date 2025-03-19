import express from 'express';
import { authorize } from '../middleware/AuthMiddleware.js';
import { create, show, update, destroy } from '../controllers/admin/DashboardController.js';

const router = express.Router();

router.post('/create', authorize('admin'), create);
router.get('/show', authorize('admin', 'manager'), show);
router.put('/update/:id', authorize('admin'), update);
router.delete('/delete/:id', authorize('admin'), destroy);

export const userRoutes = router;
