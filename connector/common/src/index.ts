import { ComponentModel }     from './component';
import { ElementModel }       from './element';
import { MediaProviderModel } from './mediaProvider.model';

export * from './component';
export * from './element';
export * from './mediaProvider.model';
export * from './fieldTypes';

export interface Collections {
    component: ComponentModel;
    element: ElementModel;
    media_provider: MediaProviderModel;
}

export type CollectionKey = keyof Collections;

export interface DatabaseUpdate {
    collection: CollectionKey;
    operationType: string;
    _id: any;
}