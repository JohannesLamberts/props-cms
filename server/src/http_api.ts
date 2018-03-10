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
                        DatabaseApi.registerOn(Server.logger, app);
                        ServiceApi.registerOn(Server.logger, app);
                    }
                });
    }
};