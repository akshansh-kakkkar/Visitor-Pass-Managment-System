import jwt from 'jsonwebtoken'
import User from '../Models/UserModel.js'


const Protection = async (req, res, next)=>{
    try{
        const AuthHeader = req.headers.authorization;
        if(!AuthHeader || !AuthHeader.startsWith('Bearer')){
            return res.status(401).json({
                message : "Invalid Token"
            })
        }
        const token = AuthHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password')

        if(!req.user){
            return res.status(401).json({
                message : "User not found"

            })
        }
        next()
    }
    catch(error){
        res.status(401).json({
            message : error.message
        })
    }
}

const restrictedTo = (...role)=>{
    return (req, res, next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({
                message : "No such User found"
            })
        }
        next()
    }
}

export {Protection, restrictedTo}