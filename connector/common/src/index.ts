import { CollDefinitionModel } from './collectionDefinition.model';
import { CollElementModel }    from './collectionElement.model';

export * from './collectionDefinition.model';
export * from './collectionElement.model';
export * from './fieldTypes';

export interface Collections {
    coll_definition: CollDefinitionModel;
    coll_element: CollElementModel;
}

export type CollectionKey = keyof Collections;

export interface DatabaseUpdate {
    collection: CollectionKey;
    operationType: string;
    _id: any;
}