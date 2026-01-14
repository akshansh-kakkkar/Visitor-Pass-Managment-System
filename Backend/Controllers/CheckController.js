import Pass from "../Models/PassModel.js";
import CheckLog from "../Models/CheckLogModel.js";

const scanQR = async (req, res) => {
    try {
        const { qrData } = req.body;
        // Assuming QR format is "Pass-<ID>"
        const appointmentId = qrData.replace('Pass-', "")

        // Find the pass using the ID
        const pass = await Pass.findOne({ appointment: appointmentId, isActive: true });

        if (!pass) {
            return res.status(400).json({
                message: "Pass Invalid or Expired"
            });
        }

        // Check if there is already an active log (checked in but not checked out)
        const existingLog = await CheckLog.findOne({
            pass: pass._id,
            checkOutTime: null // Active session
        });

        if (existingLog) {
            // CHECK OUT LOGIC
            existingLog.checkOutTime = new Date();
            await existingLog.save();

            // Deactivate pass upon exit
            pass.isActive = false;
            await pass.save();

            return res.status(200).json({
                message: "Visitor checked out successfully",
                log: existingLog
            });
        } else {
            // CHECK IN LOGIC
            const log = await CheckLog.create({
                pass: pass._id,
                security: req.user.id,
                checkInTime: new Date(),
                checkOutTime: null
            });

            return res.status(201).json({
                message: "Visitor checked in successfully",
                log
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
}

export default scanQR