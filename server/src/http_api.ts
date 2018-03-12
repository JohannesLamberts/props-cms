import { DatabaseApi } from './api/api.editor';
import { ServiceApi }  from './api/api.serving';
import { ENV }         from './env';
import { Server }      from './environment';

const { api } = ENV.webserver;

export default () => {
    if (api) {
        Server
            .createExpress(
                {
                    port: api.port,
                    init: app => {

                        app.use((req, res, next) => {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
                            res.setHeader('Access-Control-Allow-Headers',
                                          'Origin, X-Requested-With, Content-Type, Accept');
                            next();
                        });

                        DatabaseApi.registerOn(Server.logger, app);
                        ServiceApi.registerOn(Server.logger, app);
                    }
                });
    }
};