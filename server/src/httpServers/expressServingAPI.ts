import * as path         from 'path';
import { ENV }           from '../env';
import { ExpressModule } from '../modules/http_server/express.module';

const AppFrontend = (req, res) => {
    res.sendFile(path.join(process.cwd(), '../../client/build/index.html'));
};

ExpressModule.create(ENV.webserver.servingAPI.port, (app) => {
    app.get('/elements', AppFrontend);
    app.get('/file/:id', AppFrontend);
});