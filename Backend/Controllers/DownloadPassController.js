import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const downloadPass = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(dirname, '..', 'passes', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                message: "Pass file not found"
        });
        }
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).json({
            message: "Failed to download pass",
            error: error.message
      });
    }
};
