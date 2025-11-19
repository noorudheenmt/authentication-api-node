import * as authService from "../services/authService.js";

// register controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser({
      name,
      email,
      password,
    });
    res
      .status(201)
      .json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser({ email, password });
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//send otp controller
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await authService.sendOtpToEmail(email);
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//reset password controller
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const data = await authService.verifyOtpAndReset(email, otp, newPassword);
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
