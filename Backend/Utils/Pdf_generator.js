import PDFDocument from 'pdfkit';
import fs from 'fs';
import { resolve } from 'path';


const PdfGenerator = (visitor, appointment, qrCodePath)=>{
    return new Promise((resolve)=>{
        const doc = new PDFDocument();
        const filepath = `passes/${Date.now()}-visitor-${visitor.name}.pdf`;
        doc.pipe(fs.createWriteStream(filepath));
        doc.fontSize(20).text('Visitor Pass', {align : 'center'});
        doc.moveDown();

        doc.text(`Name : ${visitor.name}`);
        doc.text(`Company : ${visitor.company || "N/A"}`);
        doc.text(`Host : ${appointment.host?.name || 'N/A'}`);
        doc.text(`Date : ${appointment.date}`);
        doc.text(`Time : ${appointment.time}`);
        doc.moveDown();
        doc.image(qrCodePath, {width : 150});

        doc.end();
        resolve(filepath)
    })
}

export default PdfGenerator