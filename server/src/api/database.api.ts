import { DefinitionsDb } from '../database/definition/definition.db';
import { Collections }   from '../models/_collections';
import { Api }           from '../modules/api/api';
import { EHttpState }    from '../modules/api/httpState';
import { MongoID }       from '../modules/database/db.module';

export const DefinitionsApi = new Api('db');

DefinitionsApi
    .addRoute<{ collection: keyof Collections }>('/:collection')
    .get((req, res, { params }) => {
        DefinitionsDb
            .collection(params.collection)
            .find({})
            .toArray()
            .then(documents => {
                res.json(documents);
            });
    })
    .post<{
        data: any
    }>((req, res, { body, params }) => {
        DefinitionsDb
            .collection(params.collection)
            .insertOne(body.data)
            .then(({ insertedId }) => {
                res.status(EHttpState.eCreated)
                   .json({ insertedId });
            });
    });

DefinitionsApi
    .addRoute<{ id: string, collection: keyof Collections }>('/:collection/:id')
    .get((req, res, { params }) => {
        DefinitionsDb.collection(params.collection)
                     .findOne({ _id: new MongoID(params.id) })
                     .then(document => {
                         if (!document) {
                             res.status(EHttpState.eNotFound)
                                .end();
                         } else {
                             res.status(EHttpState.eOk)
                                .json(document);
                         }
                     });
    })
    .patch<{ data: any }>((req, res, { body, params }) => {
        delete body.data._id;
        DefinitionsDb.collection(params.collection)
                     .updateOne({ _id: new MongoID(params.id) }, { $set: body.data })
                     .then(() => {
                         res.sendStatus(EHttpState.eOk);
                     });
    })
    .delete((req, res, { params }) => {
        DefinitionsDb.collection(params.collection)
                     .deleteOne({ _id: new MongoID(params.id) })
                     .then(() => {
                         res.sendStatus(EHttpState.eOk);
                     });
    });