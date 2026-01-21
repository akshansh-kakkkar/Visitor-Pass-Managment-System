import Visitor from "../Models/VisitorUser.js";
import Appointment from "../Models/AppointmentModel.js";


export const createAppointment = async (req, res) => {
    try {
        const { hostId, date, time, purpose } = req.body;

        const appointment = await Appointment.create({
            visitor: req.user._id,
            host: hostId,
            date,
            time,
            purpose,
            status: "pending"
        })
        res.status(201).json(appointment)
    }
    catch (err) {
        res.status(500).json({
            message: err.message,

        })
    }
}

export const getAllAppointments = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'visitor') {
            query = { visitor: req.user._id };
        } else if (req.user.role === 'employee') {
            query = { host: req.user._id };
        } else {
            return res.status(403).json({ message: "Access denied" });
        }

        const appointments = await Appointment.find(query)
            .populate('visitor')
            .populate('host')
            .sort({ createdAt: -1 });

        res.status(200).json(appointments)
    } catch (error) {
        console.error('Error in getAllAppointments:', error);
        res.status(500).json({
            message: error.message
        })
    }
}