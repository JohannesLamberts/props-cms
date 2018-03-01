import {
    CollectionKey,
    Collections
} from 'props-cms.connector-common';
import {
    ImmutableMap,
    ImmutableMapUndef,
    ImmutableRecord
} from 'typescript-immutable';

const InitialCollectionState = new ImmutableRecord(
    {
        fullCopy: false,
        models: new ImmutableMapUndef<string, { _id: string }>()
    });

const InitialState = new ImmutableRecord(
    {
        collections: new ImmutableMap<CollectionKey, typeof InitialCollectionState>(
            InitialCollectionState)
    });

export type TState = typeof InitialState;

export const DATABASE_RECIEVE = 'DATABASE_RECIEVE';
export const DATABASE_RECIEVE_DELETE = 'DATABASE_RECIEVE_DELETE';

export type ActionRecieve<TKey extends CollectionKey> = {
    type: typeof DATABASE_RECIEVE;
    payload: {
        complete: boolean;
        collection: TKey;
        models: Array<Collections[TKey]>;
    };
};

export type ActionRecieveDelete = {
    type: typeof DATABASE_RECIEVE_DELETE;
    payload: {
        operations: Record<CollectionKey, string[]>
    };
};

export const Reducer = (state = InitialState,
                        action: ActionRecieve<any> | ActionRecieveDelete): TState => {
    switch (action.type) {
        case DATABASE_RECIEVE: {
            const { collection, models, complete } = action.payload;
            return state.update('collections', collections =>
                collections.update(collection, collectionData =>
                    collectionData.withMutations(currValue => {
                        const modelUpdate = {};
                        models.forEach(model => {
                            modelUpdate[model._id] = model;
                        });
                        currValue.fullCopy = currValue.fullCopy || complete;
                        currValue.models = currValue.models.setMany(modelUpdate);
                    })
                )
            );
        }
        case DATABASE_RECIEVE_DELETE: {
            const { operations } = action.payload;
            return state.update('collections', collections =>
                collections.map((collEl, collKey) =>
                                    collEl.update('models', models =>
                                        models.remove(operations[collKey] || [])
                                    )));
        }
        default:
            return state;
    }
};