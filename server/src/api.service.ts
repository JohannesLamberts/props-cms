import { MainDatabase } from './database.main';
import { Api }          from './modules/http/api';
import { EHttpState }   from './modules/http/httpState';

export const ServiceApi = new Api('service');

ServiceApi
    .addRoute('/collection')
    .get<{ query: string }>((req, res, { query }) => {
        MainDatabase
            .collection('coll_element')
            .find(JSON.parse(query.query || '{}'))
            .toArray()
            .then(elements => {
                res.json(elements);
            })
            .catch(e => {
                ServiceApi.logger.warn(`Error on /collection`, e);
                res.sendStatus(EHttpState.eServerError);
            });
    });

ServiceApi
    .addRoute<{ ident: string }>('/collection/:ident')
    .get<{ query: string }>((req, res, { params, query }) => {

        ServiceApi.logger.info(JSON.stringify({
                                                  $and: [
                                                      { collection: params.ident },
                                                      JSON.parse(query.query || '{}')
                                                  ]
                                              }));
        MainDatabase
            .collection('coll_element')
            .find({
                      $and: [
                          { collection: params.ident },
                          JSON.parse(query.query || '{}')
                      ]
                  })
            .toArray()
            .then(elements => {
                res.json(elements);
            })
            .catch(e => {
                ServiceApi.logger.warn(`Error on /collection/:ident`, e);
                res.sendStatus(EHttpState.eServerError);
            });
    });