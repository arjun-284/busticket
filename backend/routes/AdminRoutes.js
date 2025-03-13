import express from 'express';
import { protect, authorize } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(protect, authorize('admin', 'manager', 'staff'));



export const authRoutes = router;
