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