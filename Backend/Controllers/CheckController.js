import Pass from "../Models/PassModel.js";
import CheckLog from "../Models/CheckLogModel.js";
import Appointment from "../Models/AppointmentModel.js";

const scanQR = async (req, res) => {
    try {
        const { qrData } = req.body;

        const appointmentId = qrData.replace('Pass-', "")


        const pass = await Pass.findOne({ appointment: appointmentId, isActive: true })
            .populate({
                path: 'appointment',
                populate: { path: 'visitor host' }
            });

        if (!pass) {
            return res.status(400).json({
                message: "Pass Invalid or Expired"
            });
        }

        const existingLog = await CheckLog.findOne({
            pass: pass._id,
            checkOutTime: null
        });

        if (existingLog) {

            existingLog.checkOutTime = new Date();
            await existingLog.save();

            pass.isActive = false;
            await pass.save();

            return res.status(200).json({
                message: "Visitor checked out successfully",
                type: "checkout",
                log: existingLog,
                appointment: pass.appointment
            });
        } else {
            if (pass.appointment.status !== "approved") {
                return res.status(400).json({
                    message: "Appointment not approved yet"
                });
            }

            const log = await CheckLog.create({
                pass: pass._id,
                security: req.user._id,
                checkInTime: new Date(),
                checkOutTime: null
            });

            return res.status(201).json({
                message: "Visitor checked in successfully",
                type: 'checkIn',
                appointment: pass.appointment
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
}


export const getAllCheckLogs = async (req, res) => {
    try {
        const logs = await CheckLog.find()
            .populate({
                path: 'pass',
                populate: { path: 'appointment' }
            })
            .sort({ checkInTime: -1 });

        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
}

// Verify QR — only looks up visitor info, no check-in
export const verifyQR = async (req, res) => {
    try {
        const { qrData } = req.body;
        const appointmentId = qrData.replace('Pass-', "");

        const pass = await Pass.findOne({ appointment: appointmentId, isActive: true })
            .populate({
                path: 'appointment',
                populate: { path: 'visitor host' }
            });

        if (!pass) {
            return res.status(400).json({
                message: "Pass Invalid or Expired"
            });
        }

        const existingLog = await CheckLog.findOne({
            pass: pass._id,
            checkOutTime: null
        });

        return res.status(200).json({
            message: "Pass verified successfully",
            appointment: pass.appointment,
            passId: pass._id,
            alreadyCheckedIn: !!existingLog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const rejectVisitor = async (req, res) => {
    try {
        const { qrData } = req.body;
        const appointmentId = qrData.replace('Pass-', "");

        const pass = await Pass.findOne({ appointment: appointmentId, isActive: true });
        if (!pass) {
            return res.status(400).json({ message: "Pass Invalid or Expired" });
        }

        pass.isActive = false;
        await pass.save();

        const appointment = await Appointment.findById(appointmentId);
        if (appointment) {
            appointment.status = 'rejected';
            await appointment.save();
        }

        return res.status(200).json({
            message: "Visitor has been rejected and pass deactivated"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export default scanQR;
