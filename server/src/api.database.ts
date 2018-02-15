import { Collections }   from 'props-cms.connector-common';
import { DefinitionsDb } from './database.main';
import { Api }           from './modules/http_server/api';
import { EHttpState }    from './modules/http_server/httpState';

export const DatabaseApi = new Api('db');

const randomId = (length: number = 16): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

DatabaseApi
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
            .insertOne(Object.assign({ _id: randomId() }, body.data))
            .then(({ insertedId }) => {
                res.status(EHttpState.eCreated)
                   .json({ insertedId });
            });
    });

DatabaseApi
    .addRoute<{ id: string, collection: keyof Collections }>('/:collection/:id')
    .get((req, res, { params }) => {
        DefinitionsDb.collection(params.collection)
                     .findOne({ _id: params.id })
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
                     .updateOne({ _id: params.id }, { $set: body.data })
                     .then(() => {
                         res.sendStatus(EHttpState.eOk);
                     });
    })
    .delete((req, res, { params }) => {
        DefinitionsDb.collection(params.collection)
                     .deleteOne({ _id: params.id })
                     .then(() => {
                         res.sendStatus(EHttpState.eOk);
                     });
    });