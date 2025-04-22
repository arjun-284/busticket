import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
   {

      fullName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      passenger: {
         type: String,
         required: true,
      },
      totalPrice: {
         type: String,
         required: true,
      },
      paymentMethod: {
         type: String,
         required: true,
      },
      busId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Bus", 
         required: true,
      },
      busTitle: {
         type: String,
         required: true,
      },
      date: {
         type: String,
         required: true,
      },
      from: {
         type: String,
         required: true,
      },
      to: {
         type: String,
         required: true,
      },
      bus_number: {
         type: String,
         required: true,
      },
      guest: {
         type: Number,
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


export const Booking = mongoose.model('Booking', bookingSchema);