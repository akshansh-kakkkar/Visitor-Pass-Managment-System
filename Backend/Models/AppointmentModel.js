import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ApppointmentSchema = new Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
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
    status: {
        enum: ['pending', 'aprooved', 'rejected'],
        default: 'pending',
        type: String,
    },

}, { timestamps: true }

);


export default mongoose.model('Apppointment', ApppointmentSchema);
