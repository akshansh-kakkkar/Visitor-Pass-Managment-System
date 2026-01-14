import nodemailer from "nodemailer";

// Create transporter lazily to ensure env vars are loaded
const getTransporter = () => {
  console.log("📧 Creating email transporter...");
  console.log("📧 EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ NOT SET");
  console.log("📧 EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ NOT SET");

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendPassEmail = async (to, pdfPath) => {
  console.log("📧 Attempting to send email to:", to);
  console.log("📧 PDF Path:", pdfPath);

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

    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed!");
    console.error("❌ Error:", error.message);
    throw error;
  }
};
