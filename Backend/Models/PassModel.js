import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PassSchema = new Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisitorUser",
        required: true,
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    qrCode: {
        type: String,
        required: true,
    },
    validFrom: {
        type: Date,
        required: true,
    },
    validTill: {
        type: Date,
        required: true,
    },
    pdfPath: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,

    },
}, { timestamps: true })

export default mongoose.model("Pass", PassSchema)

