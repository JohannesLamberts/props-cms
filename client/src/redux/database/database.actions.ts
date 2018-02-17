import { Collections } from 'props-cms.connector-common';
import { HttpApi }     from '../../services/api';
import {
    StoreDispatch,
    StoreState
}                      from '../store';
import * as Database   from './database.reducer';

const DatabaseApiConnector = new HttpApi(process.env.REACT_APP_URL_API + '/db');

const DatabaseGet = <TKey extends keyof Collections>(collection: TKey): Promise<Array<Collections[TKey]>> => {
    return DatabaseApiConnector.get(`/${collection}`);
};

const DatabaseGetId = <TKey extends keyof Collections>(collection: TKey, id: string): Promise<Collections[TKey]> => {
    return DatabaseApiConnector.get(`/${collection}/${id}`);
};

export const DatabaseRequire = (collection: keyof Collections) => {
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

export const DatabaseRequireId = <TKey extends keyof Collections>(collection: TKey, id: string, force?: boolean) => {
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

export const DatabasePush = <TKey extends keyof Collections>(collection: TKey, insertData: Collections[TKey]) => {
    return (dispatch: StoreDispatch) => {
        DatabaseApiConnector.post(`/${collection}`, { data: insertData });
    };
};

export const DatabasePatch = <TKey extends keyof Collections>(collection: keyof Collections,
                                                              id: string,
                                                              patchData: Partial<Collections[TKey]>) => {
    return (dispatch: StoreDispatch) => {
        DatabaseApiConnector.patch(`/${collection}/${id}`, { data: patchData });
    };
};

export const DatabaseDelete = (collection: keyof Collections, id: string) => {
    return (dispatch: StoreDispatch) => {
        return DatabaseApiConnector.delete(`/${collection}/${id}`);
    };
};

const DatabaseRecieve = <TKey extends keyof Collections>
(data: Database.ActionRecieve<TKey>['payload']): Database.ActionRecieve<TKey> => {

    return {
        type: Database.DATABASE_RECIEVE,
        payload: data
    };
};