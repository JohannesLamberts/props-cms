import * as express         from 'express';
import * as path            from 'path';
import { DatabaseApi }      from './api.database';
import { ServiceApi }       from './api.service';
import { ENV }              from './env';
import { createExpressApp } from './modules/http/express.module';

const { webserver } = ENV;

const { api, editor } = webserver;

if (api) {
    createExpressApp(api.port, app => {
        DatabaseApi.register(app);
        ServiceApi.register(app);
    });
}

if (editor) {
    createExpressApp(editor.port, app => {
        const AppFrontend = (req, res) => {
            res.sendFile(path.join(process.cwd(), editor.src!, 'index.html'));
        };
        app.use('/static', express.static(path.join(editor.src!, 'static')));
        app.get('/', AppFrontend);
        app.get('/*', AppFrontend);
    });
}