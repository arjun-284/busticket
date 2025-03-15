import express from 'express';
import { protect } from '../middleware/AuthMiddleware.js';
import { busRoutes } from './BusRoutes.js';

const router = express.Router();

router.use(protect);
router.use('/bus', busRoutes);


export const adminRoutes = router;
