import { User } from '../../models/UserModel.js';
import { validateUserFields } from '../../utils/validateFields.js';

export const create = async (req, res) => {
   try {
      const { name, email, password, confirm_password, role } = req.body;

      if (!validateUserFields(req.body)) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      const newUser = { name, email, password, role };

      const user = await User.create(newUser);
      return res.status(201).json(user);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

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

export const edit = async (req, res) => {
   try {
      const bus = await Bus.findById(req.params.id);
      if (!bus) {
         return res.status(404).json({ message: 'Bus not found' });
      }
      return res.status(200).json(bus);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const update = async (req, res) => {
   try {
      const { id } = req.params;
      const updatedBus = req.body;

      if (!validateBusFields(updatedBus)) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      const bus = await Bus.findByIdAndUpdate(id, updatedBus, { new: true });

      if (!bus) {
         return res.status(404).json({ message: 'Bus not found' });
      }

      return res.status(200).json(bus);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndDelete(id);

      if (!bus) {
         return res.status(404).json({ message: 'Bus not found' });
      }
      return res.status(200).json({ message: 'Bus deleted successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
