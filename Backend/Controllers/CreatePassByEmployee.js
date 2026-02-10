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
            photo: "staff-created",
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

        const pass = await PassModel.create({
            visitor: visitor._id,
            appointment: appointment._id,
            qrCode,
            pdfPath: pdfPath,
            validFrom: new Date(),
            validTill: new Date(Date.now() + 8 * 60 * 60 * 1000)
        });
        let emailSent = false;
        if (visitor.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await sendPassEmail(visitor.email, pdfPath);
                emailSent = true;
                console.log("Email sent successfully!");
            } catch (emailError) {
                console.error("Email sending failed with error:", emailError);
                console.error("Error details:", emailError.message);
            }
        }
        res.status(201).json({
            message: emailSent ? "Pass created and email sent successfully" : "Pass created successfully but email failed to send",
            appointment,
            pass,
            emailSent
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export default CreatePassByEmployee;
