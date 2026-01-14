import Appointment from "../Models/AppointmentModel.js";
import Visitor from "../Models/VisitorModel.js";
import Pass from "../Models/PassModel.js";
import QRCode from "qrcode";
import fs from "fs";
import generatePdf from "../Utils/Pdf_generator.js";
import { sendPassEmail } from "../Utils/Email.js";

const handleAppointment = async (req, res) => {
    try {
        const { appointmentId, action } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(400).json({
                message: "No Appointment found"
            });
        }
        if (appointment.status !== 'pending') {
            return res.status(400).json({
                message: "Appointment already processsed"
            })
        }

 
        const visitorId = appointment.visitor._id || appointment.visitor;

        if (action === 'reject') {
            appointment.status = 'rejected';
            await appointment.save()
            return res.status(201).json({
                message: "Sorry your appointment has been rejected please contact the admin of the organization if you have any other queries",

            })
        }
        if (action === 'approve') { 
            appointment.status = 'approved';
            await appointment.save()


            const qrData = `Pass-${appointment._id}`;
            const qrCode = await QRCode.toDataURL(qrData);
            const visitor = await Visitor.findById(visitorId);
            if (!visitor) {
                return res.status(404).json({ message: "Visitor not found" });
            }

            const qrPath = `uploads/${appointment._id}.png`;

      
            if (!fs.existsSync('uploads')) {
                fs.mkdirSync('uploads');
            }

            await QRCode.toFile(qrPath, qrData);

            const PdfPath = await generatePdf(visitor, appointment, qrPath);

            // Send email only if credentials are configured
            if (visitor.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                try {
                    await sendPassEmail(visitor.email, PdfPath);
                } catch (emailErr) {
                    console.log("Email sending failed (credentials may not be configured):", emailErr.message);
                }
            }

            const pass = await Pass.create({
                visitor: visitorId,
                appointment: appointment._id,
                qrCode,
                validFrom: new Date(),
                validTill: new Date(Date.now() + 8 * 60 * 60 * 1000)
            })

            return res.status(201).json({
                message: "Your appointment has been approved successfully! Pass has been sent to your email.",
                pass
            })
        }

        return res.status(400).json({
            message: "Invalid action. Use 'approve' or 'reject'"
        })

    }
    catch (error) {
        console.error("Handle Appointment Error:", error);
        res.status(500).json({
            message: error.message
        })
    }
}

export default handleAppointment