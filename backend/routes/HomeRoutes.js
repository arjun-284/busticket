import express from 'express';
import { protect } from '../middleware/AuthMiddleware.js';
import { home } from '../controllers/HomeController.js';

const router = express.Router();

router.get('/home', home);


export const homeRoutes = router;
