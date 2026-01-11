import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name :{
        required : true,
        type: String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    role : {
        required : true,
        type : String,
        enum : ['admin', 'employee', 'security'],
        default : 'employee',
    },
    phone : {
        type : String,
        required : true,
    },
    department : String
}, {timestamps : true})


// Password Hashing 
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
})

// Password Matching for comparision
UserSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password)
}

export default mongoose.model('User', UserSchema)