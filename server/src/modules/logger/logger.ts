export type LogLevel = 'off' | 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error';

export class Logger<TMeta = any> {

    static readonly kLogLevels = ['off', 'silly', 'debug', 'verbose', 'info', 'warn', 'error'];

    public static shouldLog(threshold: LogLevel, level: LogLevel) {
        return Logger.kLogLevels.indexOf(threshold)
            <= Logger.kLogLevels.indexOf(level);
    }

    public static isValidLevel(level: LogLevel) {
        return Logger.kLogLevels.some(thisLevel => thisLevel === level);
    }

    constructor(private _logCb: (level: LogLevel, message: string, meta?: any) => void,
                private _name: string) {
    }

    error(message: string, meta?: TMeta): Error {
        this._log('error', message, meta);
        return new Error(message);
    }

    warn(message: string, meta?: TMeta): Error {
        this._log('warn', message, meta);
        return new Error(message);
    }

    info(message: string, meta?: TMeta): void {
        this._log('info', message, meta);
    }

    verbose(message: string, meta?: TMeta): void {
        this._log('verbose', message, meta);
    }

    debug(message: string, meta?: TMeta): void {
        this._log('debug', message, meta);
    }

    silly(message: string, meta?: TMeta): void {
        this._log('silly', message, meta);
    }

    public log(level: LogLevel, message: string, meta?: TMeta): void {
        if (Logger.isValidLevel(level)) {
            this._log(level, message, meta);
        } else {
            this.warn(`Invalid log level: ${level}`);
        }
    }

    private _log(level: LogLevel, message: string, meta?: TMeta): void {
        this._logCb(level, `${this._name} :: ${message}`, meta);
    }
}