import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckLogSchema = new Schema({
    pass: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pass",
    },
    security: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    checkInTime: {
        type: Date,
    },
    checkOutTime: {
        type: Date,
    }
}, { timestamps: true })

export default mongoose.model('CheckLog', CheckLogSchema)