import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitorUser',
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
    },
    photo: {
        type: String,
        required: true,
    },
    status: {
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        type: String,
    },

}, { timestamps: true }

);


export default mongoose.model('Appointment', AppointmentSchema);
