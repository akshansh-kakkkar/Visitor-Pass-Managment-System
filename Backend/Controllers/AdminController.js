import User from "../Models/UserModel.js";
import Visitor from "../Models/VisitorUser.js";
import CheckLog from '../Models/CheckLogModel.js'

export const CreateStaff = async (req, res) => {
    try {
        const { name, email, password, role, phone, department } = req.body;
        if (!['employee', 'security', 'admin'].includes(role)) {
            return res.status(400).json({
                message: "Role Not Found"
            });
        };
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                message: "User Already exists"
            })
        };
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role,
            department,
        });
        res.status(201).json({
            message: 'user created successfully',
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                phone: user.phone,
                department: user.department
            }
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    };
};


export const getAllVisitors = async (req, res) => {
    try {
        const visitor = await Visitor.find().sort({ createdAt: -1 });
        res.status(200).json({
            visitor
        });
    } catch (error) {
        console.error("Error in getAllVisitors:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllactiveVisitors = async (req, res) => {
    try {
        const active = await CheckLog.find({ checkOutTime: null }).populate('pass').populate('security');
        res.status(200).json(active);
    } catch (error) {
        console.error("Error in getAllactiveVisitors:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getVisitorHistory = async (req, res) => {
    try {
        const history = await CheckLog.find().populate('pass').populate('security').sort({ createdAt: -1 });
        res.status(200).json(history)
    } catch (error) {
        console.error("Error in getVisitorHistory:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({
            role: { $in: ['employee', 'security'] }
        }).select('name email role department isActive _id');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching staff members",
            error: error.message
        });
    }
};

export const toggleStaff = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !['employee', 'security'].includes(user.role)) {
            return res.status(404).json({
                message: `staff not found`
            })
        }

        user.isActive = !user.isActive;
        await user.save()
        res.json({
            message: `User ${user.isActive ? "enabled" : "disabled"}`,
            isActive: user.isActive
        });
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}


export const EditStaff = async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Missing employee id' });
        }

        const updatedEmployee = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee has been updated successfully",
            employee: updatedEmployee
        });

    } catch (error) {
        res.status(500).json({
            message: "An error updated while updating the employee",
            error: error.message
        });

    }
}

export const updateVisitor = async (req, res) => {
    try {
        const { id, name, email } = req.body;
        
        if (!id) {
            return res.status(400).json({
                message: "Visitor ID is required"
            });
        }

        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found"
            });
        }

        if (name) visitor.name = name;
        if (email) visitor.email = email;

        await visitor.save();

        res.status(200).json({
            message: "Visitor updated successfully",
            visitor
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating visitor",
            error: error.message
        });
    }
}