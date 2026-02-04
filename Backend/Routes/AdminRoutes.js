import express from 'express';
import { CreateStaff, getAllVisitors, getAllactiveVisitors, getVisitorHistory, getAllEmployees, toggleStaff, EditStaff, updateVisitor } from '../Controllers/AdminController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';

const router = express.Router();

router.post('/create-user', Protection, restrictedTo('admin'), CreateStaff);
router.get('/all-visitors', Protection, restrictedTo('admin', 'employee'), getAllVisitors);
router.get('/all-active-visitors', Protection, restrictedTo('admin'), getAllactiveVisitors);
router.get('/all-visitor-logs', Protection, restrictedTo('admin'), getVisitorHistory)
router.get('/employees', Protection, getAllEmployees)
router.patch('/toggle-staff/:id', Protection, restrictedTo('admin'),  toggleStaff)
router.patch('/edit-employees', Protection, restrictedTo("admin"), EditStaff)
router.patch('/update-visitor', Protection, restrictedTo('admin'), updateVisitor)
export default router;
