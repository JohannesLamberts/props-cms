import * as path          from 'path';
import * as winston       from 'winston';
import { LoggerInstance } from 'winston';
import { ENV }            from '../../env';
import {
    Logger,
    LogLevel
}                         from './logger';

const winstonLogger: LoggerInstance
          = new winston.Logger({
                                   level: ENV.logger.level,
                                   exitOnError: false
                               });

winstonLogger.add(winston.transports.Console, {
    colorize: true,
    name: 'console',
    level: ENV.logger.level,
    timestamp: true
});

['info', 'warn', 'error'].forEach(level => {
    winstonLogger.add(winston.transports.File, {
        name: `${level}-file`,
        filename: path.join(process.cwd(), ENV.logger.path, `${level}.log`),
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