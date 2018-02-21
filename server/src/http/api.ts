import { DatabaseApi } from '../api/api.database';
import { ServiceApi }  from '../api/api.service';
import { ENV }         from '../env';
import { Server }      from '../environment';

const { api } = ENV.webserver;

if (api) {
    Server
        .createExpress(
            {
                port: api.port,
                init: [DatabaseApi, ServiceApi]
            });
}