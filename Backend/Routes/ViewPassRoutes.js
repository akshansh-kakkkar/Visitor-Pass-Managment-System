import express from "express";
import { ViewPass } from "../Controllers/VisitorPass.js";
import { Protection, restrictedTo } from "../Middleware/Protect.js";

const router = express.Router();

router.get("/my", Protection, restrictedTo("visitor"), ViewPass);
export default router;