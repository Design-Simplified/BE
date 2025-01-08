import path from 'path';
import winston from 'winston';

export const prismaLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/prisma.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaString = Object.keys(meta).length
            ? JSON.stringify(meta, null, 2)
            : '';
          const messageString =
            typeof message === 'object'
              ? JSON.stringify(message, null, 2)
              : message;

          return `${timestamp} [${level}]: ${messageString} ${metaString}`;
        }),
      ),
    }),
  ],
});

export const appLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaString = Object.keys(meta).length
            ? JSON.stringify(meta, null, 2)
            : '';
          const messageString =
            typeof message === 'object'
              ? JSON.stringify(message, null, 2)
              : message;

          return `${timestamp} [${level}]: ${messageString} ${metaString}`;
        }),
      ),
    }),
  ],
});
