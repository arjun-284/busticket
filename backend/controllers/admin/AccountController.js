import { Booking } from '../../models/BookingModel.js';
import { Account } from '../../models/AccountModel.js';

export const getAccount = async (req, res) => {
   try {
      const booking = await Booking.find({});
      let income = 0;
      let expenses = 0;
      let vat = 0;
      let profit = 0;
      let loss = 0;
      let operationalCosts = 0;
      let salaryExpenses = 0;
      let bonuses = 0;
      let deductions = 0;

      // Ensure numeric addition for booking totalPrice
      booking.forEach((item) => {
         income += parseFloat(item.totalPrice);
      });

      const accounts = await Account.find({});
      accounts.forEach((item) => {
         // Convert item.value to a number using parseFloat
         const numValue = parseFloat(item.value);
         if (item.category === 'Basic Accounting') {
            if (item.metric === 'Income') {
               income += numValue;
            } else if (item.metric === 'Expenses') {
               expenses += numValue;
            }
         } else if (item.category === 'Payroll Management') {
            if (item.metric === 'Salary Expenses' || item.metric === 'Bonuses') {
               expenses += numValue;
               salaryExpenses += numValue;
               if (item.metric === 'Bonuses') {
                  bonuses += numValue;
               }
            } else if (item.metric === 'Deductions') {
               income += numValue;
               deductions += numValue;
            }
         } else if (item.category === 'Tax & Compliance') {
            if (item.metric === 'VAT') {
               expenses += numValue;
               vat += numValue;
            }
         } else if (item.category === 'Real-Time Financial Reports') {
            if (item.metric === 'Profit') {
               income += numValue;
               profit += numValue;
            } else if (item.metric === 'Loss') {
               expenses += numValue;
               loss += numValue;
            }
         } else if (item.category === 'Vendor & Supplier Payments') {
            if (item.metric === 'Operational Costs') {
               expenses += numValue;
               operationalCosts += numValue;
            }
         }
      });

      res.status(200).json({
         income,
         expenses,
         vat,
         profit,
         loss,
         operationalCosts,
         salaryExpenses,
         bonuses,
         deductions
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};



export const createOrUpdateAccount = async (req, res) => {
   const { category, metric, value } = req.body;

   try {
      // Check if an account with this category and metric already exists
      const existingAccount = await Account.findOne({ category, metric });

      if (existingAccount) {
         // Parse both values and sum them
         const oldVal = parseInt(existingAccount.value);
         const newVal = parseInt(value);
         const total = oldVal + newVal;

         // Update the existing record with the new total
         existingAccount.value = total;
         await existingAccount.save();

         res.status(200).json(existingAccount);
      } else {
         // Create a new record if one doesn't exist
         const newAccount = new Account({ category, metric, value });
         await newAccount.save();
         res.status(201).json(newAccount);
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};