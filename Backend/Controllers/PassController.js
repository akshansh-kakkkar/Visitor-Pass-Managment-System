import Appointment from "../Models/AppointmentModel.js";
import QRCode from 'qrcode'
import Pass from "../Models/PassModel.js";
import generatePdf from "../Utils/Pdf_generator.js";
import { sendPassEmail } from "../Utils/Email.js";
import fs from 'fs'
import Visitor from "../Models/VisitorModel.js";

const handleAppointment = async (req,res)=>{
    try{
        const {appointmentId, action} = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.status(400).json({
                message : "No Appointment found"
            });
        }
        if(appointment.status !== 'pending'){
            return res.status(400).json({
                message : "Appointment already processsed"
            })
        }
        if(action === 'rejected'){
            appointment.status = 'rejected';
            await appointment.save()
            return res.status(201).json({
                message : "Sorry your appointment has been rejected please contact the admin of the organization if you have any other queries",
                
            })
        }
        if(action === 'aprooved'){
            appointment.status = 'aprooved';
            await appointment.save()
            
            // Generate QR code and pass
            const qrData = `Pass-${appointment._id}`;
            const qrCode = await QRCode.toDataURL(qrData);
            const visitor = await Visitor.findById(appointment.visitor);
            const qrPath = `uploads/${appointment._id}.png`;

            await QRCode.toFile(qrPath, qrData);

            const PdfPath = await generatePdf(visitor, appointment, qrPath);

            // Send email with pass
            if(visitor.email){
                await sendPassEmail(visitor.email, PdfPath)
            }

            const pass = await Pass.create({
                visitor: appointment.visitor,
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
            message: "Invalid action. Use 'aprooved' or 'rejected'"
        })

    }    
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }   
}

export default handleAppointment