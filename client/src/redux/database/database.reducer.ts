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

export type ActionRecieve<TKey extends CollectionKey> = {
    type: typeof DATABASE_RECIEVE;
    payload: {
        complete: boolean;
        collection: TKey;
        models: Array<Collections[TKey]>;
    };
};

export const Reducer = (state = InitialState,
                        action: ActionRecieve<any>): TState => {
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
        default:
            return state;
    }
};