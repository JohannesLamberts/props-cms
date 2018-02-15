import * as bodyParser   from 'body-parser';
import * as compression  from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express      from 'express';
import {
    Request,
    Response
}                        from 'express';
import { Application }   from 'express-serve-static-core';
import * as http         from 'http';
import * as morgan       from 'morgan';
import { LoggerModule }  from '../logger/logger.module';

const logger = LoggerModule.spawn('EXPRESS');

export const createExpressApp = (port: number, setup: (app: Application) => void) => {

    const app: Application = express();

    app.use(cookieParser('')); // TODO: Set secret
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(compression());
    app.use(morgan('dev'));

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    setup(app);

    app.get('*', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const pojo = {
            status: 404,
            message: 'No Content'
        };
        const json = JSON.stringify(pojo, null, 2);
        res.status(404).send(json);
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port);
    logger
        .info(`HTTP Server listening on `
            + `http://${httpServer.address().address}:${httpServer.address().port}`);
};