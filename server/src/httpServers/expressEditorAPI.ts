import { DefinitionsApi } from '../api/database.api';
import { ENV }            from '../env';
import { ExpressModule }  from '../modules/http_server/express.module';

ExpressModule.create(ENV.webserver.editorAPI.port, (app) => {
    DefinitionsApi.register(app);
});