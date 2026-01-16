import nodemailer from "nodemailer";
const getTransporter = () => {

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendPassEmail = async (to, pdfPath) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Your Visitor Pass",
      text: "Your visitor pass is attached. Please show this QR at the gate.",
      attachments: [
        {
          filename: "visitor-pass.pdf",
          path: pdfPath
        }
      ]
    });
    return info;
  } catch (error) {
    throw error;
  }
};
