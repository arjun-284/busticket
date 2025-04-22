import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
   {
      category: {
         type: String,
         required: true,
      },
      metric: {
         type: String,
         required: true,
      },
      value: {
         type: String,
         required: true,
      }
   },
   {
      timestamps: true,
   }
);


export const Account = mongoose.model('Account', accountSchema);