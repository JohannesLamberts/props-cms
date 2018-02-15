import { Collections }  from 'props-cms.connector-common';
import { MainDatabase } from './database.main';
import { Api }          from './modules/http/api';
import { EHttpState }   from './modules/http/httpState';

export const DatabaseApi = new Api('db');

DatabaseApi
    .addRoute<{ collection: keyof Collections }>('/:collection')
    .get((req, res, { params }) => {
        MainDatabase
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
        MainDatabase
            .collection(params.collection)
            .insertOne(body.data)
            .then(({ insertedId }) => {
                res.status(EHttpState.eCreated)
                   .json({ insertedId });
            });
    });

DatabaseApi
    .addRoute<{ id: string, collection: keyof Collections }>('/:collection/:id')
    .get((req, res, { params }) => {
        MainDatabase.collection(params.collection)
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
        MainDatabase.collection(params.collection)
                    .updateId(params.id, { $set: body.data })
                    .then(() => {
                        res.sendStatus(EHttpState.eOk);
                    });
    })
    .delete((req, res, { params }) => {
        MainDatabase.collection(params.collection)
                    .deleteId(params.id)
                    .then(() => {
                        res.sendStatus(EHttpState.eOk);
                    });
    });