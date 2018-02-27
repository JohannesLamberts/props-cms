import {
    CollectionKey,
    Collections
}                     from 'props-cms.connector-common';
import { connect }    from 'react-redux';
import { StoreState } from '../store';
import {
    DatabaseRequire,
    DatabaseRequireId
}                     from './database.actions';

type FullRequest<TKeys extends string = string> = { readonly [key in TKeys]: CollectionKey };

interface FilteredRequestElement {
    readonly collection: CollectionKey;
    readonly id: string;
}

type FilteredRequest<TKeys extends string = string> = { readonly [key in TKeys]: FilteredRequestElement };

export const withDatabaseConnect = <TProps = {},
    TKeysFull extends string = string,
    TKeysId extends string = string>
(requestFull: FullRequest<TKeysFull> | ((props: TProps) => FullRequest<TKeysFull>),
 requestId: FilteredRequest<TKeysId> | ((props: TProps) => FilteredRequest<TKeysId>)) => {

    return connect(
        (store: StoreState, props: TProps) => {
            const fullRequests = typeof requestFull === 'function' ? requestFull(props) : requestFull;
            const idRequests = typeof requestId === 'function' ? requestId(props) : requestId;

            const map = {};
            for (const key of Object.keys(fullRequests)) {
                map[key] = store.database
                                .get('collections')
                                .get(fullRequests[key])
                                .get('models')
                                .toArray();
            }

            for (const key of Object.keys(idRequests)) {
                const idRequest = idRequests[key];
                map[key] = store.database
                                .get('collections')
                                .get(idRequest.collection)
                                .get('models')
                                .get(idRequest.id);
            }
            return map as {
                [PFull in keyof typeof fullRequests]: Array<Collections[(typeof fullRequests)[PFull]]>
                } & {
                [PId in keyof typeof idRequests]: Collections[(typeof idRequests)[PId]['collection']];
                };
        },
        (dispatch, props: TProps) => {
            const fullRequests = typeof requestFull === 'function' ? requestFull(props) : requestFull;
            const idRequests = typeof requestId === 'function' ? requestId(props) : requestId;

            return {
                onMount: () => {
                    for (const key of Object.keys(fullRequests)) {
                        dispatch(DatabaseRequire(fullRequests[key]));
                    }
                    for (const key of Object.keys(idRequests)) {
                        const idRequest = idRequests[key];
                        dispatch(DatabaseRequireId(idRequest.collection, idRequest.id));
                    }
                }
            };
        });
};