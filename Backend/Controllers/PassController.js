import Appointment from "../Models/AppointmentModel.js";
import QRCode from 'qrcode'
import Pass from "../Models/PassModel.js";
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
            await appointment.save()
            return res.status(201).json({
                message : "Sorry your appointment has been rejected please contact the admin of the organization if you have any other queries",
                
            })
        }
        if(action === 'aprooved'){
            await appointment.save()
            return res.status(201).json({
                message : "Your appointment has been aprooved successfully!",
            })
        }
        const qrData = `Pass-${appointment._id}`;
        const qrCode = await QRCode.toDataURL(qrData);

        const pass = await Pass.create({
            visitor: appointment.visitor,
            appointment : appointment._id,
            qrCode,
            validFrom : new Date(),
            validTill : new Date(Date.now() + 8 *60 *60* 60 * 1000)
        })
        res.status(201).json({
            message : "Appointment approoved successfully! and Pass is also generated",
            pass
        })

    }    
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }   
}

export default handleAppointment