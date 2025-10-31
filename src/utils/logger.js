const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, json } = format;
const path = require("path");

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const base = `${timestamp} [${level}] : ${
    typeof message === "object" ? JSON.stringify(message) : message
  }`;
  return stack ? `${base} - ${stack}` : base;
});

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new transports.Console({ format: combine(timestamp(), logFormat) }),
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
    new transports.File({ filename: path.join("logs", "combined.log") }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join("logs", "exceptions.log") }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join("logs", "rejections.log") }),
  ],
});

module.exports = logger;
