import * as Immutable    from 'immutable';
import { DbApiService }  from '../services/database.api_service';
import { StoreDispatch } from './store';

export interface DatabaseModelRecieve {
    type: string;
    models: { _id: string; }[];
}

interface DatabaseParams {
    models: Immutable.Map<string, Immutable.Map<string, any>>;
}

export interface DatabaseState
    extends Immutable.Map<keyof DatabaseParams, any> {
    get: <TKey extends keyof DatabaseParams>(key: TKey) => DatabaseParams[TKey];
}

const DATABASE_RECIEVE = 'DATABASE_RECIEVE';

type ActionRecieve = {
    type: typeof DATABASE_RECIEVE;
    payload: DatabaseModelRecieve;
};
type Action = ActionRecieve;

export class DatabaseActions {

    static require(collection: string): ((dispatch: StoreDispatch) => void) {
        return (dispatch: StoreDispatch) => {
            DbApiService
                .get(collection)
                .then(data =>
                          dispatch(DatabaseActions
                                       .recieve({
                                                    type: collection,
                                                    models: data
                                                }))
                );
        };
    }

    static requireId(collection: string, id: string): ((dispatch: StoreDispatch) => void) {
        return (dispatch: StoreDispatch) => {
            DbApiService
                .getId(collection, id)
                .then(data =>
                          dispatch(DatabaseActions
                                       .recieve({
                                                    type: collection,
                                                    models: [data]
                                                }))
                );
        };
    }

    static patch<TData = any>(collection: string,
                              id: string,
                              data: Partial<TData>): ((dispatch: StoreDispatch) => void) {

        return (dispatch: StoreDispatch) => {
            DbApiService
                .patch(collection, id, data)
                .then(() =>
                          dispatch(DatabaseActions.requireId(collection, id))
                );
        };
    }

    static recieve(data: DatabaseModelRecieve): ActionRecieve {
        return {
            type: DATABASE_RECIEVE,
            payload: data
        };
    }
}

const DbRecord = Immutable.Record({
                                      models: Immutable.Map()
                                  });

export const DatabaseReducer = (state: DatabaseState
                                    = new DbRecord() as DatabaseState,
                                action: Action): DatabaseState => {
    switch (action.type) {
        case DATABASE_RECIEVE:
            const { type, models } = action.payload;
            return state.update('models',
                                modelsState =>
                                    modelsState.update(type,
                                                       Immutable.Map(),
                                                       modelsMap =>
                                                           modelsMap.withMutations(map => {
                                                               models.forEach(model => {
                                                                   map.set(model._id, model);
                                                               });
                                                               return map;
                                                           })));

        default:
            return state;
    }
};