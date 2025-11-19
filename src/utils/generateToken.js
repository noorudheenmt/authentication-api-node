import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Create JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecretKey, {
    expiresIn: config.jwtExpiry,
  });
};

export default generateToken;