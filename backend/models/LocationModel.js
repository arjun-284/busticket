import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
   {

      name: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);


export const Location = mongoose.model('Location', locationSchema);