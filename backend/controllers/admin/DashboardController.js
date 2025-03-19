import { User } from '../../models/UserModel.js';
import { Bus } from '../../models/BusModel.js';
import { validateUserFields } from '../../utils/validateFields.js';
import {registerUser} from '../AuthController.js';

export const index = async (req, res) => {   
   try {
      const totalUser = await User.countDocuments();
      const totalBus = await Bus.countDocuments();
      return res.status(200).json({
         totalUser,totalBus
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const create = registerUser;

export const show = async (req, res) => {
   try {
      const users = await User.find({});
      return res.status(200).json({
         data: users
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const update = async (req, res) => {
   try {
      const { id } = req.params;
      const updatedUser = req.body;

      if (!validateUserFields(updatedUser, id)) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
