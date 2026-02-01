import express from 'express';
import { createAppointment,  getAllAppointments } from '../Controllers/AppointmentController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();


router.post('/create-appointment', Protection, restrictedTo('visitor'), createAppointment);
router.get('/my-appointments', Protection, restrictedTo('visitor', 'employee'), getAllAppointments )
export default router;
