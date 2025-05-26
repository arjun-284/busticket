import express from 'express';
import { authorize, protect } from '../middleware/AuthMiddleware.js';
import { busRoutes } from './BusRoutes.js';
import { userRoutes } from './UserRoutes.js';
import { index, getAllBooking } from '../controllers/admin/DashboardController.js';
import { getAccount, addAccount } from '../controllers/admin/AccountController.js';

const router = express.Router();

router.use(protect);
router.get('/dashboard', authorize('admin', 'manager', 'staff'), index);
router.get('/booking', authorize('admin', 'manager', 'staff'), getAllBooking);
router.use('/bus', busRoutes);
router.use('/user', userRoutes);
router.get('/account-data', authorize('admin', 'manager'), getAccount);
router.post('/account-data', authorize('admin', 'manager'), addAccount);


export const adminRoutes = router;
