import express from 'express';
import scanQR, { getAllCheckLogs } from '../Controllers/CheckController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();

router.post('/check-log', Protection, restrictedTo('security'), scanQR);
router.post('/scanqr', Protection, restrictedTo('security'), scanQR);
router.get('/scanqr', Protection, getAllCheckLogs);
export default router;