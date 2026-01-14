import PDFDocument from 'pdfkit';
import fs from 'fs';

const PdfGenerator = (visitor, appointment, qrCodePath) => {
    return new Promise((resolve, reject) => {
        try {
            // Create passes folder if it doesn't exist
            if (!fs.existsSync('passes')) {
                fs.mkdirSync('passes');
            }
            
            const doc = new PDFDocument();
            const filepath = `passes/${Date.now()}-visitor-${visitor.name}.pdf`;
            const stream = fs.createWriteStream(filepath);
            
            doc.pipe(stream);
            doc.fontSize(20).text('Visitor Pass', { align: 'center' });
            doc.moveDown();

            doc.text(`Name : ${visitor.name}`);
            doc.text(`Company : ${visitor.company || "N/A"}`);
            doc.text(`Host : ${appointment.host?.name || 'N/A'}`);
            doc.text(`Date : ${appointment.date}`);
            doc.text(`Time : ${appointment.time}`);
            doc.moveDown();
            
            if (fs.existsSync(qrCodePath)) {
                doc.image(qrCodePath, { width: 150 });
            }

            doc.end();
            
            stream.on('finish', () => resolve(filepath));
            stream.on('error', reject);
        } catch (err) {
            reject(err);
        }
    });
}

export default PdfGenerator;
