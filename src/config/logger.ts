import * as winston from 'winston';
import { Format, TransformableInfo } from 'logform';
import * as path from 'path';
import moment from 'moment';

const logFormat: Format = winston.format.printf((info: TransformableInfo) => {
    const timestamp = info.timestamp
        ? moment(info.timestamp).local().format('YYYY-MM-DD HH:mm:ss')
        : moment().local().format('YYYY-MM-DD HH:mm:ss');

    return `${timestamp} [${info.level}]: ${info.message}`;
});

const logger: winston.Logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize({ all: true }),
                logFormat,
            ),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/info.log'),
            level: 'info',
            maxsize: 5242880,
            maxFiles: 5,
            format: winston.format.combine(winston.format.timestamp(), logFormat),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
            format: winston.format.combine(winston.format.timestamp(), logFormat),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/exceptions.log'),
            format: winston.format.combine(winston.format.timestamp(), logFormat),
        }),
    ],
    exitOnError: false,
});

export { logger };
