import express from 'express';
import CreateStaff from '../Controllers/AdminController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();

router.post('/create-user', Protection, restrictedTo('admin'), CreateStaff );

export default router;
