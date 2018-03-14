import * as PropTypes from 'prop-types';
import {
    CollectionKey,
    ElementModel
}                     from 'props-cms.connector-common';
import * as React     from 'react';
import * as SOCKET    from 'socket.io-client';
import { debounce }   from 'throttle-debounce';

export const CmsConnectorChannel = '__CMS_CONNECTOR__';

export const CmsConnectorContextType: {
    __CMS_CONNECTOR__: any;
} = {
    __CMS_CONNECTOR__: PropTypes.object
};

export type CollectionImports = Record<string, () => any | React.ComponentType>;

export type CmsContextRequest =
    (collIdent: string,
     query: Object,
     callback: (nodes: ElementModel[],
                err?: Error) => void) => void;

export interface CmsSubscription {
    unsubscribe: () => void;
}

export interface CmsContext {
    subscribe: (collIdent: string, query: Object, callback: CmsConnectorSubscriptionCallback) => CmsSubscription;
    collections: CollectionImports;
}

export interface CmsConnectorProps {
    children: any;
    api: string;
    websocket?: string;
    collections: CollectionImports;
}

export type CmsConnectorSubscriptionCallback = (models: ElementModel[], err?: Error) => void;

interface CmsConnectorSubscription {
    collIdent: string;
    query: Object;
    callback: CmsConnectorSubscriptionCallback;
    fullfilled: boolean;
}

export enum EDatabaseEventType {
    eInsert,
    eDelete,
    eUpdate
}

export interface DatabaseEvent {
    type: EDatabaseEventType;
    id: string;
    collection: CollectionKey;
}

class CmsConnector extends React.Component<CmsConnectorProps> {

    static childContextTypes = CmsConnectorContextType;
    private _ws: SOCKET | null = null;
    private _subscriptions: CmsConnectorSubscription[] = [];
    private _cache: {
        [P in string]?: ElementModel[]
        } = {};

    private _fetching: boolean = false;
    private _refetchWhenReady: boolean = false;

    static fetch<TReturn extends Object>(url: string): Promise<TReturn> {

        const headers = new Headers();
        headers.append('accept', 'application/json');

        return fetch(url,
                     {
                         method: 'GET',
                         headers
                     })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP ERROR');
                }
                return response.json()
                               .catch(() => {
                                   return { status: response.statusText };
                               });
            });
    }

    constructor(props: CmsConnectorProps) {

        super(props);

        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleWebsocketUpdate = this.handleWebsocketUpdate.bind(this);

        this._runFetch = debounce(20, false, this._runFetch.bind(this));

        if (props.websocket) {
            this._ws = SOCKET(props.websocket);

            this._ws.on('db.next', this.handleWebsocketUpdate);

            this._ws.on('connect', () => {
                this._ws.emit('db.subscribe', 'subscribe');
            });

            this._ws.on('disconnect', () => {
                console.debug(`WS disconnected`);
            });
        }
    }

    handleWebsocketUpdate(data: DatabaseEvent) {

        if (data.collection !== 'element') {
            return;
        }

        const { api } = this.props;

        for (const ident of Object.keys(this._cache)) {
            const models = this._cache[ident];
            if (!models) {
                continue;
            }
            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                if (model._id !== data.id) {
                    continue;
                }
                switch (data.type) {
                    case EDatabaseEventType.eUpdate:
                    case EDatabaseEventType.eInsert:
                        CmsConnector
                            .fetch<ElementModel[]>(
                                api + `/collection?query=${JSON.stringify({ _id: data.id })}`)
                            .then(fetchedModels => {
                                if (fetchedModels.length !== 1) {
                                    console.debug(`Expected to return exactly one model`);
                                }
                                const collIdent = fetchedModels[0].collection;
                                this._collectionInsert(collIdent, fetchedModels);
                                this._collectionSend(collIdent);
                            });
                        break;
                    case EDatabaseEventType.eDelete:
                        models.splice(i, 1);
                        break;
                    default:
                        throw new Error(`Switch case not handled: ${data.type}`);
                }
                return;
            }
        }

    }

    handleSubscribe(collIdent: string, query: Object, callback: CmsConnectorSubscriptionCallback) {
        const newSubscription = {
            collIdent,
            query,
            callback,
            fullfilled: false
        };
        this._subscriptions.push(newSubscription);
        this._runFetch();
        return {
            unsubscribe: () => {
                this._subscriptions = this._subscriptions.filter(sub => sub !== newSubscription);
            }
        };
    }

    getChildContext(): { __CMS_CONNECTOR__: CmsContext } {
        const { collections } = this.props;
        return {
            [CmsConnectorChannel]: {
                subscribe: this.handleSubscribe,
                collections
            }
        };
    }

    render() {
        return this.props.children;
    }

    private _runFetch() {

        if (this._fetching) {
            this._refetchWhenReady = true;
            return;
        }

        const collectionKeys = this._subscriptions
                                   .filter(sub => !sub.fullfilled)                          // unfulfilled
                                   .map(sub => sub.collIdent)                               // map
                                   .filter((el, index, arr) => arr.indexOf(el) === index);  // unique

        Promise
            .all(collectionKeys
                     .map(collIdent =>
                              this._collectionFetch(collIdent)
                     ))
            .then(() => {
                this._fetching = false;
                if (this._refetchWhenReady) {
                    this._refetchWhenReady = false;
                    this._runFetch();
                }
            });
    }

    private _collectionFetch(collIdent: string): Promise<void> {

        const subscriptions = this._subscriptions.filter(sub => sub.collIdent === collIdent),
              fulfilled     = subscriptions.filter(sub => sub.fullfilled),
              unfulfilled   = subscriptions.filter(sub => !sub.fullfilled);

        const unfulfilledQuerys: string[] = [],
              fulfilledQuerys             = fulfilled.map(sub => sub.query);

        for (const sub of unfulfilled) {
            const { query } = sub;
            if (!fulfilledQuerys                                                    // if no fulfilled query
                    .some(fulfilledQuery =>
                              Object.keys(fulfilledQuery)                           // has keys
                                    .every(fullfilledKey =>                 // that all filter
                                               query.hasOwnProperty(fullfilledKey)  // for the same value
                                               && query[fullfilledKey] === fulfilledQuery[fullfilledKey]
                                    ))) {
                unfulfilledQuerys.push(JSON.stringify(query));
                fulfilledQuerys.push(query);
            }
        }

        if (unfulfilledQuerys.length === 0) {
            return Promise.resolve();
        }

        const { api }  = this.props,
              apiQuery = unfulfilledQuerys.length === 1
                  ? '{}'
                  : JSON.stringify({ $or: unfulfilledQuerys });

        return CmsConnector
            .fetch<ElementModel[]>(
                api + `/collection/${collIdent}?query=${apiQuery}`)
            .then(models => {
                this._collectionInsert(collIdent, models);
                for (const sub of unfulfilled) {
                    sub.fullfilled = true;
                }
                this._collectionSend(collIdent);
            });
    }

    private _collectionInsert(collIdent: string, models: ElementModel[]) {
        const modelIds = models.map(model => model._id);
        this._cache[collIdent] = [
            ...(this._cache[collIdent] || []).filter(currModel =>
                                                         modelIds.indexOf(currModel._id) === -1),
            ...models
        ];
    }

    private _collectionSend(collIdent: string) {

        const cache         = this._cache[collIdent] || [],
              subscriptions = this._subscriptions.filter(sub => sub.collIdent === collIdent);

        for (const sub of subscriptions) {

            const { query, callback } = sub,
                  queryFields         = Object.keys(query);

            callback(cache.filter(data => {
                for (const field of queryFields) {
                    const val = query[field];
                    let ptr = data;
                    for (const pathEl of field.split('.')) {
                        if (!ptr.hasOwnProperty(pathEl)) {
                            return false;
                        }
                        ptr = ptr[pathEl];
                    }
                    if (ptr !== val) {
                        return false;
                    }
                }
                return true;
            }));
        }
    }
}

export default CmsConnector;