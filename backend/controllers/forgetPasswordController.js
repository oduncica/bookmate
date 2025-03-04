import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(2).toString("hex"); // 4 characters long

    // Set token and expiration on user model (../models/User.js)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    // Generate reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/passwordreset/${resetToken}`;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER,
      },
    });

    // Verify transporter configuration (optional but recommended)
    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Transporter Error:", error);
      } else {
        console.log("SMTP Transporter is ready to send emails.");
      }
    });

    // Email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
                <p>Hello ${user.fname},</p>
                <p>You have requested to reset the password of your account.</p>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>See you soon!</p>
                <p>Locally,<br/>Bookmate team</p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `,
    };

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error sending email:", err);
        return res.status(500).json({ message: "Email could not be sent." });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Password reset email sent." });
    });
  } catch (err) {
    console.log("Forgot Password Error: ", err);
    res.status(500).json({ message: "Server error." });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const resetToken = req.params.token;
  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Update the password directly without hashing
    user.password = newPassword;

    // Clear token and expiry so this token can't be reused
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset Password Error: ", err);
    return res.status(500).json({ message: "Server error." });
  }
};
