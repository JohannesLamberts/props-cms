import * as express     from 'express';
import { Application }  from 'express-serve-static-core';
import { LoggerModule } from '../logger/logger.module';
import { ApiRoute }     from './route';

const Logger = LoggerModule.spawn('API');

export class Api {

    private _routes: Record<string, ApiRoute<any>> = {};

    constructor(private _basePathID: string) {
    }

    public addRoute<TRouteParams = {}>(route: string): ApiRoute<TRouteParams> {
        const newRoute = new ApiRoute<TRouteParams>();
        this._routes[route] = newRoute;
        return newRoute;
    }

    public register(app: Application) {

        const router = express.Router();

        for (const routePath of Object.keys(this._routes)) {
            const route = this._routes[routePath];
            for (const method of Object.keys(route.methods)) {
                router[method](routePath,
                               (req, res) => {
                                   try {
                                       route.methods[method](req, res, {
                                           body: req.body,
                                           params: req.params,
                                           query: req.query
                                       });
                                   } catch (e) {
                                       Logger.warn(`Error on ${method.toUpperCase()} `
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