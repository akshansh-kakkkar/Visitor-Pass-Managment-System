import RegisterVisitor from "../Controllers/VisitorController.js";
import express from "express";
import upload from "../Utils/upload.js";
const router = express.Router();

router.post('/create-visitor',upload.single('photo'), RegisterVisitor);

export default router