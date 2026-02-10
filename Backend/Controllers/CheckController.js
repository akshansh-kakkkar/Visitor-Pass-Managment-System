import Pass from "../Models/PassModel.js";
import CheckLog from "../Models/CheckLogModel.js";

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

export default scanQR;