import { RegisterVisitor, getAllVisitors } from "../Controllers/VisitorController.js";
import express from "express";
import upload from "../Utils/upload.js";
import { Protection } from "../Middleware/Protect.js";
const router = express.Router();

router.post('/create-visitor', upload.single('photo'), RegisterVisitor);
router.get('/all-visitors', Protection, getAllVisitors);

export default router