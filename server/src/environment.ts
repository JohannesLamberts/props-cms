import { ServerEnvironment } from 'server-modules';

export const Server = new ServerEnvironment(
    {
        ident: 'CMS',
        logger: {
            console: {
                level: 'silly'
            },
            file: {
                path: './_local_data',
                levels: ['info', 'warn', 'error']
            }
        }
    }
);
