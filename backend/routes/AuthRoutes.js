import express from 'express';
import { registerUser, loginUser } from '../controllers/AuthController.js';
import { protect } from '../middleware/AuthMiddleware.js';
import { updateProfile, changePassword } from '../controllers/SettingController.js';
// REMOVE THIS LINE: import routeName from './routes/RouteFile.js';

// (Optional) import { addToBlacklist } from '../utils/blacklist.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/logout', protect, (req, res) => {
   // If you have a blacklist, import and use it.
   // const token = req.headers.authorization.split(' ')[1];
   // addToBlacklist(token);
   res.status(200).json({ message: 'Logged out successfully' });
});

router.put('/change/profile', protect, updateProfile);
router.post('/change/password', protect, changePassword);

export default router;  // Use default export!
