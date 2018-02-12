import { DefinitionsDb } from '../database/definition/definition.db';
import { Api }           from '../modules/api/api';
import { EHttpState }    from '../modules/api/httpState';

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