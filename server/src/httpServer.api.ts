import { DatabaseApi }   from './api.database';
import { ServiceApi }    from './api.service';
import { WebserverCfg }  from './env';
import { ExpressModule } from './modules/http_server/express.module';

export default (cfg: WebserverCfg) =>
    ExpressModule.create(cfg.port, (app) => {
        DatabaseApi.register(app);
        ServiceApi.register(app);
    });