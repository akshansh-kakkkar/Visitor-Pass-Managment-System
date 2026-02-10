import express from 'express';
import { createAppointment, getAllAppointments } from '../Controllers/AppointmentController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';
import upload from '../Middleware/Upload.js';

const router = express.Router();


router.post('/create-appointment', Protection, restrictedTo('visitor'), upload.single('photo'), createAppointment);
router.get('/my-appointments', Protection, restrictedTo('visitor', 'employee'), getAllAppointments)
export default router;
