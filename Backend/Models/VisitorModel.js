import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    company : {
        type : String
    },
    photo : {
        type : String,
    },
    purpose : {
        type : String,
    }
}, {timestamps : true})


export default mongoose.model('Visitor', VisitorSchema)