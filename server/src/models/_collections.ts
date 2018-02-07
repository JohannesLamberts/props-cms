import { CollDefinitionModel } from './collectionDefinition.model';
import { CollElementModel }    from './collectionElement.model';

export interface Collections {
    coll_definitions: CollDefinitionModel;
    coll_elements: CollElementModel;
}