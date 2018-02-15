import { MainDatabase } from './database.main';
import { Api }          from './modules/http/api';
import { EHttpState }   from './modules/http/httpState';

export const ServiceApi = new Api('service');

ServiceApi
    .addRoute<{ ident: string }>('/:ident')
    .get<{ filter: string }>((req, res, { params }) => {
        MainDatabase
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