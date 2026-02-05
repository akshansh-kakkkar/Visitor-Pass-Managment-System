import Appointment from "../Models/AppointmentModel";
import Visitor from "../Models/VisitorUser.js";
import QrCode from "qrcode";
import fs from "fs";
import Pass from "../Models/PassModel.js";
import generatePdf from "../Utils/Pdf_generator.js";
import SendEmail, { sendPassEmail } from "../Utils/Email.js";

export default CreatePassByEmployee = async (req, res) => {
    try {
        const { VisitorId, date, time, purpose } = req.body;
        let visitor = await Visitor.findById({ VisitorId });
        if (!visitor) {
            res.status(404).json({
                message: "Visitor not found."
            })
        }
        const appointment = Appointment.create({
            visitor: visitor._id,
            host: req.user._id,
            date,
            time,
            purpose,
            status: "approved"
        })
        const qrCodeData = `Pass-${appointment._id}`
        const qrCode = await QRCode.toDataURL(qrCodeData);

        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads")
        }
        const QrPath = `uploads/${appointment._id}.png`;
        await qrCode.toFile(QrPath, qrCodeData);

        const PDFPath = await generatePdf(visitor, appointment, QrPath);
        if (visitor.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await sendPassEmail(visitor.email, PDFPath);
            }
            catch (error) {
                res.status(401).json({
                    message: "Email failed to sent!"
                })
            }
        }
        const Pass = Pass.create({
            visitor: visitor._id,
            appointment: appointment._id,
            qrCode,
            PDFPath: PDFPath,
            validFrom: new Date(),
            validTill: new Date(Date.now() + 8 * 60 * 60 * 1000)
        });


        res.status(201).json({
            message: "Pass created successfully",
            appointment,
            Pass
        });
    }
    catch (error) {
        res.status(501).json({
            message: error.message
        })
    }
}