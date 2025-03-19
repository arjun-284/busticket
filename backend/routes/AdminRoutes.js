import express from 'express';
import { authorize, protect } from '../middleware/AuthMiddleware.js';
import { busRoutes } from './BusRoutes.js';
import { userRoutes } from './UserRoutes.js';
import { index } from '../controllers/admin/DashboardController.js';

const router = express.Router();

router.use(protect);
router.get('/dashboard', authorize('admin','manager','staff') ,index);
router.use('/bus', busRoutes);
router.use('/user', userRoutes);


export const adminRoutes = router;
