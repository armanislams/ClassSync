import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    teacherEmail: {
        type: String,
        required: true,
    },
    teacherName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available',
    },
    bookedBy: {
        name: { type: String, default: null },
        email: { type: String, default: null },
    }
}, { timestamps: true });

const Slot = mongoose.model("Slot", slotSchema);
export default Slot;
