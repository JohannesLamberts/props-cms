import {
    ApiSegment,
    EHttpState
}                        from 'server-modules';
import { getCollection } from '../database/database';

export const ServiceApi = new ApiSegment('service');

ServiceApi
    .addRoute('/collection')
    .get<{
        query: string
    }>(({ query }, res) => {
        getCollection('coll_element')
            .find(JSON.parse(query.query || '{}'))
            .toArray()
            .then(elements => {
                res.json(elements);
            })
            .catch(e => {
                res.sendStatus(EHttpState.eServerError);
                throw e;
            });
    });

ServiceApi
    .addRoute<{ ident: string }>('/collection/:ident')
    .get<{
        query: string
    }>(({ params, query }, res) => {
        getCollection('coll_element')
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
                res.sendStatus(EHttpState.eServerError);
                throw e;
            });
    });