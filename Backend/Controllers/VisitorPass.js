import Pass from '../Models/PassModel.js'
import Appointment from "../Models/AppointmentModel.js";
export const ViewPass = async (req, res) => {
    try {
        const passes = await Pass.find({
            visitor: req.user._id
        }).sort({ createdAt: -1 });

        res.json(passes);
    }
    catch (error) {
        console.error("ViewPass Error:", error);
        res.status(500).json({
            message: "Failed to load pass"
        })
    }
}