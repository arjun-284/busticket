import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    owner: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    passenger: { type: Number, required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    type: { type: String, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    bus_number: { type: String, required: true, unique: true, trim: true },
    amenities: {
      wifi: { type: Boolean, default: false },
      ac: { type: Boolean, default: false },
      charging: { type: Boolean, default: false },
    },
    departure_date: { type: String, required: true, trim: true },
    renew_date: { type: String, required: true, trim: true },
    insurance_renew_date: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Bus = mongoose.model('Bus', busSchema);
