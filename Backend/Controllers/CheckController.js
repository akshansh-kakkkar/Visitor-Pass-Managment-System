import Pass from "../Models/PassModel.js";
import CheckLog from "../Models/CheckLogModel.js";

const scanQR =async (req,res)=>{
    try{
        const {qrData} =req.body;
        const appointmentId = qrData.replace('Pass-', "")
        const pass = Pass.findOne({appointment : appointmentId, isActive : true})

        if(!pass){
            return res.status(400).json({
                message : "Pass Invalid or Expired"
            })
        }

        const exisitngLog = await CheckLog.create({
            Pass : pass._id,
            checkOutTime : null
        })

        if(!exisitngLog){
            const log = await CheckLog.create({
                Pass : pass._id,
                security : req.user.id,
                checkInTime : new Date()
            })
        }
        res.status(201).json({
           message :  "visitor checked in",
           log
        })

        exisitngLog.checkOutTime = new Date();
        await exisitngLog.save();
        pass.isActive = false ;
        await pass.save();
        res.status(201).json({
            message : "visitor checked out"
        })
    }
    catch(error){
        res.status(500).json({
            message : error.message,
        })
    }
}

export default scanQR