import { CollectionKey } from 'props-cms.connector-common';
import {
    ApiSegment,
    EHttpState
}                        from 'server-modules';
import { getCollection } from '../database/database';

const randomId = (length: number = 16): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

export const DatabaseApi: ApiSegment = new ApiSegment('db');

DatabaseApi
    .addRoute<{ collection: CollectionKey }>('/:collection')
    .get(({ params }, res) => {
        getCollection(params.collection)
            .find({})
            .toArray()
            .then(documents => {
                res.json(documents);
            });
    })
    .post<{
        data: any
    }>(({ body, params }, res) => {
        getCollection(params.collection)
            .insertOne(
                Object.assign(
                    {
                        _id: randomId(),
                        ...body.data
                    }))
            .then(({ insertedId }) => {
                res.status(EHttpState.eCreated)
                   .json({ insertedId });
            });
    });

DatabaseApi
    .addRoute<{ id: string, collection: CollectionKey }>('/:collection/:id')
    .get(({ params }, res) => {
        getCollection(params.collection)
            .findOne({ _id: params.id })
            .then(document => {
                if (!document) {
                    res.sendStatus(EHttpState.eNotFound);
                } else {
                    res.status(EHttpState.eOk)
                       .json(document);
                }
            });
    })
    .patch<{
        data: any
    }>(({ body, params }, res) => {
        delete body.data._id;
        getCollection(params.collection)
            .updateOne({ _id: params.id }, { $set: body.data })
            .then(() => {
                res.sendStatus(EHttpState.eOk);
            });
    })
    .delete(({ params }, res) => {
        getCollection(params.collection)
            .deleteOne({ _id: params.id })
            .then(() => {
                res.sendStatus(EHttpState.eOk);
            });
    });