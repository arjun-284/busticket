import { Booking } from '../../models/BookingModel.js';
import { Account } from '../../models/AccountModel.js';
import { User } from '../../models/UserModel.js';

export const getAccount = async (req, res) => {

   try {
      const bookingIncome = await Booking.find({});
      const existingAccounts = await Account.aggregate([
         { $group: { _id: { category: "$category", metric: "$metric" }, records: { $push: "$$ROOT" } } }
      ]);
      const users = await User.find({ role: { $ne: 'user' } }).select('name _id role');

      res.status(200).json([existingAccounts, users,bookingIncome]);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const addAccount = async (req, res) => {
   const { category, metric, value, userId } = req.body;

   try {
      const accountData = { category, metric, value };
      if (userId) {
         accountData.userId = userId;
      }
      const newAccount = new Account(accountData);
      await newAccount.save();
      res.status(201).json({ message: 'Account created successfully', account: newAccount });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};