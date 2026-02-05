import express from 'express';
import { downloadPass } from '../Controllers/DownloadPassController.js';

const router = express.Router();
router.get('/:filename', downloadPass);

export default router;
