import { CollDefinitionModel } from './collectionDefinition.model';
import { CollElementModel }    from './collectionElement.model';

export interface Collections {
    coll_definition: CollDefinitionModel;
    coll_element: CollElementModel;
}