import {
    Collection,
    Cursor,
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult,
    UpdateWriteOpResult
}              from 'mongodb';
import { Api } from '../http/api';
import {
    DatabaseCollectionEvent,
    EDatabaseEventType
}              from './db.module';

export const DatabaseApi = new Api('db');

const randomId = (length: number = 16): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

export class DbCollection<TSchema> {

    constructor(private _collection: Collection<TSchema>,
                private _onChange: (data: DatabaseCollectionEvent) => void) {
    }

    find<T = TSchema>(query?: Object): Cursor<T> {
        return this._collection
                   .find(query);
    }

    findOne<T = TSchema>(filter: Object): Promise<T | null> {
        return this._collection
                   .findOne(filter);
    }

    insertOne(docs: Object): Promise<InsertOneWriteOpResult> {
        return this._collection
                   .insertOne(Object.assign(
                       {
                           _id: randomId(),
                           ...docs
                       }))
                   .then(result => {
                       this._onChange(
                           {
                               type: EDatabaseEventType.eInsert,
                               id: result.insertedId as any as string
                           });
                       return result;
                   });
    }

    deleteId(_id: string): Promise<DeleteWriteOpResultObject> {
        return this._collection
                   .deleteOne({ _id })
                   .then(result => {
                       this._onChange(
                           {
                               type: EDatabaseEventType.eDelete,
                               id: _id as any as string
                           });
                       return result;
                   });
    }

    updateId(_id: string, update: Object): Promise<UpdateWriteOpResult> {
        return this._collection
                   .updateOne({ _id }, update)
                   .then(result => {
                       this._onChange(
                           {
                               type: EDatabaseEventType.eUpdate,
                               id: _id as any as string
                           });
                       return result;
                   });
    }
}