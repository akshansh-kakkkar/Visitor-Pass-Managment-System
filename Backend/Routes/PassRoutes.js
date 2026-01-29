import express from 'express';
import handleAppointment from '../Controllers/PassController.js';
import { Protection, restrictedTo } from '../Middleware/Protect.js';
import Pass from '../Models/PassModel.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/handle-pass', Protection, restrictedTo('employee'), handleAppointment);

// Download pass endpoint
router.get('/download-pass/:passId', Protection, async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.passId);
        
        if (!pass) {
            return res.status(404).json({ message: 'Pass not found' });
        }

        // Check if user owns this pass
        if (pass.visitor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const filePath = path.resolve(pass.pdfPath);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'PDF file not found' });
        }

        res.download(filePath, `visitor-pass-${pass._id}.pdf`);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;

