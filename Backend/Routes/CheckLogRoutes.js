import express from 'express';
import CheckLog from '../Controllers/CheckController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();

router.post('/check-log', Protection, restrictedTo('security'), CheckLog);

export default router