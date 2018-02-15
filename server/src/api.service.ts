import { DefinitionsDb } from './database.main';
import { Api }           from './modules/http_server/api';
import { EHttpState }    from './modules/http_server/httpState';

export const ServiceApi = new Api('service');

ServiceApi
    .addRoute<{ ident: string }>('/:ident')
    .get<{ filter: string }>((req, res, { params }) => {
        DefinitionsDb
            .collection('coll_element')
            .find({
                      collection: params.ident
                  })
            .toArray()
            .then(elements => {
                res.json(elements);
            })
            .catch(e => {
                res.send(EHttpState.eServerError);
            });
    });