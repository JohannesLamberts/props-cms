import {
    ChangeStream,
    Db
}                              from 'mongodb';
import { WebsocketConnection } from 'server-modules';
import { getCollection }       from '../database/database';

const changeStreams: Record<string, ChangeStream> = {};

const changeStream = (collectionName: string): ChangeStream => {
    if (!changeStreams[collectionName]) {
        changeStreams[collectionName] = getCollection(collectionName).watch();
    }
    return changeStreams[collectionName];
};

export class WebsocketSubscriptionConnection extends WebsocketConnection {

    private _subscriptions: Record<string, (args?: any) => void> = {};

    public init(): this {

        this._socketListener = this._socketListener.bind(this);

        this._socket.on('db.subscribe', (collections: string[]) => {
            for (const collectionName of collections) {
                if (!this._subscriptions[collectionName]) {
                    const cb = (update) => {
                        this._socket.emit('db.next', {
                            collection: collectionName,
                            operationType: update.operationType,
                            _id: update.documentKey._id
                        });
                    };
                    changeStream(collectionName).on('change', cb);
                    this._subscriptions[collectionName] = cb;
                }
            }
        });

        this._socket.on('db.unsubscribe', (collections: string[]) => {
            this._dbUnsubscribe(collections);
        });

        return this;
    }

    public destroy() {
        this._dbUnsubscribe(Object.keys(this._subscriptions));
        return;
    }

    private _socketListener(update: {
        collection: string;
        document: any
    }) {
        this._socket.emit('db.next', update);
    }

    private _dbUnsubscribe(collectionNames: string[]) {
        for (const collectionName of collectionNames) {
            const cb = this._subscriptions[collectionName];
            if (cb) {
                changeStream(collectionName).removeListener('change', cb);
                delete this._subscriptions[collectionName];
            }
        }
    }
}