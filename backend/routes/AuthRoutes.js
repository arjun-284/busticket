import express from 'express';
import { registerUser, loginUser } from '../controllers/AuthController.js';
import { protect, authorize } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/logout', (req, res) => {
   // Get token from the header
   const token = req.headers.authorization.split(' ')[1];
   addToBlacklist(token);
   res.status(200).json({ message: 'Logged out successfully' });
});

// Example of a protected route
router.get('/admin', protect, authorize('admin'), (req, res) => {
   res.status(200).json({ message: 'Admin content' });
});

export const authRoutes = router;
