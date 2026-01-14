import express from 'express';
import handleAppointment from '../Controllers/PassController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();


router.post('/handle-pass', Protection, restrictedTo('employee'), handleAppointment);

export default router;

