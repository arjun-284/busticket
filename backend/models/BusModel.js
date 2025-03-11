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
        deport_from: {
            type: String,
            required: true,
        },
        deport_to: {
            type: String,
            required: true,
        },
        deport_date: {
            type: Date,
            required: true,
        },
        deport_time: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


export const Bus = mongoose.model('Bus', busSchema);