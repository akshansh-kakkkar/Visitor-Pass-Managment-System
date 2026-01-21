import VisitorUser from "../Models/VisitorUser.js";
import GenerateToken from "../Utils/Jwt_utils.js";


const RegisterVisitor = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                message: 'please fill all the Credentials'
            })
        }

        const alreadyExists = await VisitorUser.findOne({ email })
        if (alreadyExists) {
            return res.status(400).json({
                message: 'user already exists'
            })
        }

        const CreateVisitor = await VisitorUser.create({
            email,
            name,
            password
        })

        res.status(201).json({
            id: CreateVisitor._id,
            email: CreateVisitor.email,
            role: CreateVisitor.role,
            token: GenerateToken(CreateVisitor._id, CreateVisitor.role)
        })
    }

    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            message: error.message || "Error"
        })
    }
}

const loginVisitor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'please fill all the Credentials'
            })
        }

        const user = await VisitorUser.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: GenerateToken(user._id, user.role)
        })
    }

    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: error.message || "Error"
        })
    }
}

export default { RegisterVisitor, loginVisitor }
