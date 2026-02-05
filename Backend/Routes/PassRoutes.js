import express from 'express';
import handleAppointment from '../Controllers/PassController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';
import CreatePassByEmployee from '../Controllers/CreatePassByEmployee.js';

const router = express.Router();


router.post('/handle-pass', Protection, restrictedTo('employee'), handleAppointment);
router.post("/staff/handle-route/pass", Protection, restrictedTo("employee", "security"), CreatePassByEmployee)
export default router;

