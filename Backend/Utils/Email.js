import nodemailer from "nodemailer";

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    logger: true,
    debug: true
  });
};

export const sendPassEmail = async (to, pdfPath) => {
  const transporter = getTransporter();
  if (!transporter) {
    const msg = 'Email credentials not configured (EMAIL_USER/EMAIL_PASS)';
    console.error(msg);
    throw new Error(msg);
  }

  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error('Email transporter verification failed:', verifyErr);
    throw verifyErr;
  }

  try {
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
    console.log('Email sent:', info.messageId || info.response || info);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
