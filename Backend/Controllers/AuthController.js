import User from "../Models/UserModel.js";
import GenerateToken from "../Utils/Jwt_utils.js";


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
                token: GenerateToken(user._id, user.role)
            })
        }
        else {
            res.status(400).json({
                message: "Invalid Credentials"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export { LoginUser };
