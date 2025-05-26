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
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: false,
         default: null,
      },
   },
   {
      timestamps: true,
   }
);

export const Account = mongoose.model('Account', accountSchema);