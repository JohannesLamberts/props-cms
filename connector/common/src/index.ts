import { CollDefinitionModel } from './collectionDefinition.model';
import { CollElementModel }    from './collectionElement.model';

export * from './collectionDefinition.model';
export * from './collectionElement.model';
export * from './fieldTypes';

export interface Collections {
    coll_definition: CollDefinitionModel;
    coll_element: CollElementModel;
}