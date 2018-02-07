import * as path          from 'path';
import * as winston       from 'winston';
import { LoggerInstance } from 'winston';
import {
    Logger,
    LogLevel
}                         from './logger';

const winstonLogger: LoggerInstance
          = new winston.Logger({
                                   level: 'silly',
                                   exitOnError: false
                               });

winstonLogger.add(winston.transports.Console, {
    colorize: true,
    name: 'info-console',
    level: 'info',
    timestamp: true
});

['info', 'warn', 'error'].forEach(level => {
    winstonLogger.add(winston.transports.File, {
        name: `${level}-file`,
        filename: path.join(process.cwd(), '_local_data', 'log', `${level}.log`),
        json: false,
        level: level
    });
});

export class LoggerModule {
    public static spawn(name: string) {
        return new Logger(
            (level: LogLevel, message: string, meta?: {}) => {
                if (meta) {
                    message += '\n\t\t';
                }
                winstonLogger.log(level, message, meta);
            },
            name);
    }
}