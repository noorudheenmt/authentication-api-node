import nodemailer from "nodemailer";
import config from "../config/config.js";

// send email utility
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUsername,
        pass: config.emailPassword,
      },
    });

    // Email details
    const mailOptions = {
      from: config.emailUsername,
      to,
      subject,
      text: text || "",
      html: html || "",
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // console.log("Email sent to:", to);
  } catch (error) {
    console.error("Email sending error:", error.message);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
