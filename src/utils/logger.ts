import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logLevel = process.env.LOG_LEVEL || 'info';

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.colorize({ all: true }) }),
    new winston.transports.File({ filename: 'logs/etl.log' }),
  ],
});
