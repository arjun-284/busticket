import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';
import { JWT_SECRET } from '../config/config.js';
import { isBlacklisted } from '../utils/tokenBlackList.js';

// Middleware to protect routes
export const protect = async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      // Check if the token has been blacklisted
      if (isBlacklisted(token)) {
         return res.status(401).json({ message: 'Token has been invalidated. Please login again.' });
      }
      try {
         const decoded = jwt.verify(token, JWT_SECRET);
         req.user = await User.findById(decoded.id).select('-password');
         next();
      } catch (error) {
         res.status(401).json({ message: 'Not authorized, token failed' });
      }
   }
   if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
   }
};

// Middleware to check user role
export const authorize = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return res.status(403).json({ message: 'User role not authorized' });
      }
      next();
   };
};
