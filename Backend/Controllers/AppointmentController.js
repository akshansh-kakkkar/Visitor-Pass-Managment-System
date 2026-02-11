import Visitor from "../Models/VisitorUser.js";
import Appointment from "../Models/AppointmentModel.js";


export const createAppointment = async (req, res) => {
    try {
        const { hostId, date, time, purpose, photo } = req.body;

        if (!photo) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const appointment = await Appointment.create({
            visitor: req.user._id,
            host: hostId,
            date,
            time,
            purpose,
            photo,
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

export const SecurityChoice = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        ).populate("visitor host");

        res.status(200).json(appointment);

    }
    catch (error) {
        res.status(401).json({
            message: error.message
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