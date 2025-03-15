import { Bus } from '../../models/BusModel.js';
import { validateBusFields } from '../../utils/validateFields.js';

export const create = async (req, res) => {
   try {
      const { title, price, passenger, from, to, bus_number, renew_date } = req.body;

      if (!validateBusFields(req.body)) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      const newBus = { title, price, passenger, from, to, bus_number, renew_date };

      const bus = await Bus.create(newBus);
      return res.status(201).json(bus);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const show = async (req, res) => {
   try {
      const buses = await Bus.find({});
      return res.status(200).json({
         data: buses
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
