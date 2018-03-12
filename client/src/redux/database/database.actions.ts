import {
    CollectionKey,
    Collections
}                    from 'props-cms.connector-common';
import { HttpApi }   from '../../services/api';
import {
    StoreDispatch,
    StoreState
}                    from '../store';
import * as Database from './database.reducer';

const DatabaseApiConnector = new HttpApi(process.env.REACT_APP_URL_API + '/db');

const DatabaseGet = <TKey extends CollectionKey>(collection: TKey): Promise<Array<Collections[TKey]>> => {
    return DatabaseApiConnector.get(`/${collection}`);
};

const DatabaseGetId = <TKey extends CollectionKey>(collection: TKey, id: string): Promise<Collections[TKey]> => {
    return DatabaseApiConnector.get(`/${collection}/${id}`);
};

export const DatabaseRequire = (collection: CollectionKey) => {
    return (dispatch: StoreDispatch, getState: () => StoreState) => {
        if (getState()
                .database
                .get('collections')
                .get(collection)
                .get('fullCopy')) {
            return;
        }
        DatabaseGet(collection)
            .then(models =>
                      dispatch(DatabaseRecieve({
                                                   collection,
                                                   models,
                                                   complete: true
                                               }))
            );
    };
};

export const DatabaseRequireId = <TKey extends CollectionKey>(collection: TKey, id: string, force?: boolean) => {
    return (dispatch: StoreDispatch, getState: () => StoreState) => {
        if (!force && !!getState()
                .database
                .get('collections')
                .get(collection)
                .get('models')
                .get(id)) {
            return;
        }
        DatabaseGetId(collection, id)
            .then(data =>
                      dispatch(DatabaseRecieve<TKey>({
                                                         collection,
                                                         models: [data],
                                                         complete: false
                                                     }))
            );
    };
};

export const DatabasePush = <TKey extends CollectionKey>(collection: TKey, insertData: Collections[TKey]) => {
    return (dispatch: StoreDispatch) => {
        DatabaseApiConnector.post(`/${collection}`, { data: insertData });
    };
};

export const DatabasePatch = <TKey extends CollectionKey>(collection: CollectionKey,
                                                          id: string,
                                                          patchData: Partial<Collections[TKey]>) => {
    return (dispatch: StoreDispatch) => {
        DatabaseApiConnector.patch(`/${collection}/${id}`, { data: patchData });
    };
};

export const DatabaseDelete = (collection: CollectionKey, id: string) => {
    return (dispatch: StoreDispatch) => {
        return DatabaseApiConnector.delete(`/${collection}/${id}`);
    };
};

const DatabaseRecieve = <TKey extends CollectionKey>
(data: Database.ActionRecieve<TKey>['payload']): Database.ActionRecieve<TKey> => {

    return {
        type: Database.DATABASE_RECIEVE,
        payload: data
    };
};

export const DatabaseRecieveDeleteId = (operations: Record<CollectionKey, string[]>): Database.ActionRecieveDelete => {
    return {
        type: Database.DATABASE_RECIEVE_DELETE,
        payload: {
            operations
        }
    };
};