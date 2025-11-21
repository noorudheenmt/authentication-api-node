import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import generateToken from "../utils/generateToken.js";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";

// register user
export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return user;
};

// login user
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken(user._id);
  return { user, token };
};

// send otp
export const sendOtpToEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email not found");

  const otp = generateOtp();

  await Otp.create({
    email,
    otp,
    expireAt: Date.now() + 5 * 60 * 1000,
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });

  return { email, otpSent: true };
};

// verify otp and reset password
export const verifyOtpAndReset = async (email, otp, newPassword) => {
  const existingOtp = await Otp.findOne({ email, otp });
  if (!existingOtp) throw new Error("Invalid OTP");

  if (existingOtp.expireAt < Date.now()) {
    throw new Error("OTP expired");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  await Otp.deleteMany({ email });

  return { email, passwordReset: true };
};
