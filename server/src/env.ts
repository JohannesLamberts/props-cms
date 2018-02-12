import * as fs from 'fs';

export interface WebserverCfg {
    port: number;
    src?: string;
}

interface EnvCfg {
    db: {
        name: string;
        auth?: {
            user: string;
            pw: string;
        }
    };
    webserver: Record<string, WebserverCfg>;
    logger: {
        path: string;
        level: 'off' | 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error';
    };
}

export const ENV: EnvCfg = JSON.parse(fs.readFileSync(`${process.cwd()}\\env.local.json`)
                                        .toString());