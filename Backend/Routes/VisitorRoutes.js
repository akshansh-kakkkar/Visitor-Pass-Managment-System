import { getAllVisitors } from "../Controllers/VisitorController.js";
import express from "express";
import { Protection } from "../Middleware/Protect.js";
import VisitorAuth from "../Controllers/VisitorAuthController.js";

const router = express.Router();

router.get('/all-visitors', Protection, getAllVisitors);
router.post('/register', VisitorAuth.RegisterVisitor);
router.post('/login', VisitorAuth.loginVisitor);
export default router;