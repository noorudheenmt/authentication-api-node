import express from 'express';
import { register, login, sendOtp, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// register route
router.post('/register', register);

//login route
router.post('/login', login);

//send otp route
router.post('/send-otp', sendOtp);

//reset password route
router.post('/reset-password', resetPassword);


export default router;