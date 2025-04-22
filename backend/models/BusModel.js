import mongoose from "mongoose";

const busSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        passenger: {
            type: Number,
            required: true,
        },
        from: {
            type: mongoose.Schema.Types.ObjectId, // Reference to Location model's _id
            ref: "Location", // Name of the referenced model
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId, // Reference to Location model's _id
            ref: "Location", // Name of the referenced model
            required: true,
        },
        departure_date: {
            type: String,
            required: true,
        },
        bus_number: {
            type: String,
            required: true,
            unique: true,
        },
        renew_date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Bus = mongoose.model('Bus', busSchema);