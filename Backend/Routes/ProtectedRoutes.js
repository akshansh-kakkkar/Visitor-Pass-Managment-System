import express from 'express';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();

router.get('/admin', Protection, restrictedTo('admin'), (req, res)=>{
    res.status(200).json({
        message :  `Welcome Admin ${req.user.name}`
    })
})

router.get('/employee', Protection, restrictedTo('employee'), (req, res)=>{
    res.status(200).json({
        message : `Welcome Employee ${req.user.name}`
    })
})

router.get('/security', Protection, restrictedTo('security'), (req,res)=>{
    res.status(200).json({
        message : `Welcome Security ${req.user.name}`
    })
})

export default router