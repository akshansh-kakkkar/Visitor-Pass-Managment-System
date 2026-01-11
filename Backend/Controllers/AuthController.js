import User from "../Models/UserModel.js";
import GenerateToken from "../Utils/Jwt_utils.js";


// Register New User
const RegisterUser = async (req, res) => {
    const { name, email, password, role, phone, department } = req.body;
    const exisitingUser =await User.findOne({ email })
    try {
        if (exisitingUser) {
            return res.status(400).json({
                message: "Sorry cannot create a user because user Already exists!"
            })
        }
        const user =await User.create({
            name,
            email,
            password,
            role,
            phone,
            department
        })
        res.status(201).json({

            _id: user._id,
            name: user.name,
            password: user.password,
            role: user.role,
            department: user.department,
            token:GenerateToken(user.id, user.role)
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

// Login Existing User

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                password: user.password,
                role: user.role,
                department: user.department,
                token: GenerateToken(user.id, user.role)
            })
        }
        else{
            res.status(400).json({
                message : "Invalid Credentials"
            })
        }
    }
    catch(error) {
        res.status(500).json({
            message : error.message
        })
    }

}

export {RegisterUser, LoginUser};