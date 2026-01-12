import express from 'express';
import createAppointment from '../Controllers/AppointmentController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();


router.post('/create-appointment', Protection, restrictedTo('employee'), createAppointment);

export default router