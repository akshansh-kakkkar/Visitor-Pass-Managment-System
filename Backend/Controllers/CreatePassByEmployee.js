import Appointment from "../Models/AppointmentModel.js";
import Visitor from "../Models/VisitorUser.js";
import QRCode from "qrcode";
import fs from "fs";
import PassModel from "../Models/PassModel.js";
import generatePdf from "../Utils/Pdf_generator.js";
import { sendPassEmail } from "../Utils/Email.js";

const CreatePassByEmployee = async (req, res) => {
    try {
        const { visitorId, date, time, purpose } = req.body;
        
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found."
            });
        }

        const appointment = await Appointment.create({
            visitor: visitor._id,
            host: req.user._id,
            date,
            time,
            purpose,
            status: "approved"
        });

        const qrCodeData = `Pass-${appointment._id}`;
        const qrCode = await QRCode.toDataURL(qrCodeData);

        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads");
        }

        const qrPath = `uploads/${appointment._id}.png`;
        await QRCode.toFile(qrPath, qrCodeData);

        const pdfPath = await generatePdf(visitor, appointment, qrPath);

        if (visitor.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await sendPassEmail(visitor.email, pdfPath);
            } catch (emailError) {
                console.log("Email sending failed:", emailError.message);
            }
        }

        const pass = await PassModel.create({
            visitor: visitor._id,
            appointment: appointment._id,
            qrCode,
            pdfPath: pdfPath,
            validFrom: new Date(),
            validTill: new Date(Date.now() + 8 * 60 * 60 * 1000)
        });

        res.status(201).json({
            message: "Pass created successfully",
            appointment,
            pass
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export default CreatePassByEmployee;
