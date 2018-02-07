import * as fs from 'fs';

export const ENV = JSON.parse(fs.readFileSync(`${process.cwd()}\\env.local.json`)
                                .toString());