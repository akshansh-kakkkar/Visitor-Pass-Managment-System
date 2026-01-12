import User from "../Models/UserModel.js";

const CreateStaff = async (req, res) => {
    try {
        const { name, email, password, role, phone, department } = req.body;
        if (!['employee', 'security', 'admin'].includes(role)) {
            return res.status(400).json({
                message: "Role Not Found"
            })
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                message: "User Already exists"
            })
        }
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role,
            department,
        })
        res.status(201).json({
            message: 'user created successfully',
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                phone: user.phone,
                department: user.department
            }
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



export default CreateStaff