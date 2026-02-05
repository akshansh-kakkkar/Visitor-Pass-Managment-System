import express from 'express';
import CheckLog from '../Controllers/CheckController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';
import scanQR from '../Controllers/CheckController.js';

const router = express.Router();

router.post('/check-log', Protection, restrictedTo('security'), CheckLog);
router.post('/scanqr', Protection, restrictedTo('security'), scanQR)
export default router