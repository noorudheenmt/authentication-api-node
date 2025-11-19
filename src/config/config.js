import dotenv from "dotenv";
import path from "path";

// Determine current environment (default = development)
const env = process.env.NODE_ENV || "development";
const envFile = `.env.${env}`;

// Load .env file from project root
dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const config = {
  environment: env,
  serverPort: process.env.PORT,
  databaseUri: process.env.DB_URI,
  jwtSecretKey: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRES_IN,
  otpExpirySeconds: process.env.OTP_EXPIRY,
  emailUsername: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASS,
  logLevel: process.env.LOG_LEVEL,
};

export default config;
