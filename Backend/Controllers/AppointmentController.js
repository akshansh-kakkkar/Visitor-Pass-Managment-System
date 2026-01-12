import Visitor from "../Models/VisitorModel.js";
import Appointment from "../Models/AppointmentModel.js";


const createAppointment = async (req,res)=>{
    try{
        const {visitorId, date, time, purpose} = req.body;

        const visitor = await Visitor.findById(visitorId);

        if(!visitor){
            return res.status(404).json({
                message : "No such visitor found"
            })
        }

        const appointment = await Appointment.create({
            visitor : visitorId,
            host : req.user.id,
            date,
            time,
            purpose
        });
        res.status(201).json({
            appointment,
            message : "Appointment created successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message : error.messsage
        })
    }
}

export default createAppointment