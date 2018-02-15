import * as express     from 'express';
import { Application }  from 'express-serve-static-core';
import { Logger }       from '../logger/logger';
import { LoggerModule } from '../logger/logger.module';
import { ApiRoute }     from './apiRoute';

const ApiLogger = LoggerModule.spawn('API');

export class Api {

    private _routes: Record<string, ApiRoute<any>> = {};
    private _logger: Logger;

    get logger(): Logger {
        return this._logger;
    }

    constructor(private _basePathID: string) {
        this._logger = LoggerModule.spawn(`API: ${this._basePathID}`);
    }

    public addRoute<TRouteParams = {}>(route: string): ApiRoute<TRouteParams> {
        const newRoute = new ApiRoute<TRouteParams>();
        this._routes[route] = newRoute;
        return newRoute;
    }

    public register(app: Application) {

        ApiLogger.info(`Registering ${this._basePathID}`);

        const router = express.Router();

        for (const routePath of Object.keys(this._routes)) {
            const route = this._routes[routePath];
            const routeMethods = Object.keys(route.methods);

            ApiLogger.info(`Register: ${this._basePathID}${routePath}`
                + ` ( ${routeMethods.map(method => method.toUpperCase())
                                    .join(' | ')} )`);

            for (const method of routeMethods) {
                router[method](routePath,
                               (req, res) => {
                                   try {
                                       route.methods[method](req, res, {
                                           body: req.body,
                                           params: req.params,
                                           query: req.query
                                       });
                                   } catch (e) {
                                       ApiLogger.warn(`Error on ${method.toUpperCase()} `
                                           + `${this._basePathID}/${routePath}`);
                                       throw e;
                                   }
                               });
            }
        }

        app.use(
            `/${this._basePathID}`,
            (req, res, next) => {
                res.header('Cache-Control', 'no-cache, no-store');
                next();
            },
            router
        );
    }
}