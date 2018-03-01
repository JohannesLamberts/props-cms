import * as fs from 'fs';

export interface WebserverCfg {
    port: number;
    src?: string;
}

interface MediaEnvCfg {
    db: {
        name: string;
        auth?: {
            user: string;
            password: string;
        }
    };
    port_up: number;
    port_down: number;
    logger: {
        path: string;
        level: 'off' | 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error';
    };
}

export const MEDIA_ENV: MediaEnvCfg = JSON.parse(fs.readFileSync(`${process.cwd()}\\env.local.json`)
                                                   .toString());