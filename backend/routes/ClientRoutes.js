import express from 'express';
import { authorize, protect } from '../middleware/AuthMiddleware.js';
import { index, booking } from '../controllers/user/DashboardController.js';

const router = express.Router();

router.use(protect);
router.get('/dashboard', authorize('user'), index);
router.get('/booking', authorize('user'), booking);



export const clientRoutes = router;
