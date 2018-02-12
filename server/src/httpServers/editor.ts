import * as express      from 'express';
import * as path         from 'path';
import { WebserverCfg }  from '../env';
import { ExpressModule } from '../modules/http_server/express.module';

export default (cfg: WebserverCfg) => ExpressModule.create(cfg.port, (app) => {
    const AppFrontend = (req, res) => {
        res.sendFile(path.join(process.cwd(), cfg.src!, 'index.html'));
    };
    app.use('/static', express.static(path.join(cfg.src!, 'static')));
    app.get('/', AppFrontend);
    app.get('/*', AppFrontend);
});