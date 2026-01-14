import Visitor from "../Models/VisitorModel.js";
import Appointment from "../Models/AppointmentModel.js";


export const createAppointment = async (req, res) => {
    try {
        const { visitorId, date, time, purpose } = req.body;

        const visitor = await Visitor.findById(visitorId);

        if (!visitor) {
            return res.status(404).json({
                message: "No such visitor found"
            })
        }

        const appointment = await Appointment.create({
            visitor: visitorId,
            host: req.user.id,
            date,
            time,
            purpose
        });
        res.status(201).json({
            appointment,
            message: "Appointment created successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.messsage
        })
    }
}

export const getAllAppointments = async (req, res) => {
    try {
        console.log('Getting appointments for user:', req.user.id);
        const appointments = await Appointment.find({ host: req.user.id })
            .populate('visitor').sort({ createdAt: -1 });
        console.log('Found appointments:', appointments.length);
        res.status(200).json(appointments)
    } catch (error) {
        console.error('Error in getAllAppointments:', error);
        res.status(500).json({
            message: error.message
        })
    }
}