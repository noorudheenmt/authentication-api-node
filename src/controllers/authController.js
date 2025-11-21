import {
  registerUser,
  loginUser,
  sendOtpToEmail,
  verifyOtpAndReset,
} from "../services/authService.js";

import { registerSchema, loginSchema } from "../validations/authValidation.js";

// register controller
export const register = async (req, res) => {
  try {
    // Joi Validation
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { name, email, password, role } = value;

    // Register user 
    const user = await registerUser({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    // Joi Validation
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { email, password } = value;

    // Login Service
    const { user, token } = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// send otp controller
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await sendOtpToEmail(email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      ...data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// reset password controller
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const data = await verifyOtpAndReset(email, otp, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
      ...data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
