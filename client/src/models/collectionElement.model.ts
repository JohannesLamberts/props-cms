import { DatabaseModel }                from './_base';
import { CollDefinitionFieldTypeIdent } from './collectionDefinition.model';

export interface CollElementModelData {
    text: string;
    textArea: string;
    boolean: boolean;
    number: number;
    color: string;
    time: Date;
    date: Date;
    file: string; // update
    image: string; // update
    select: any | any[];
    tags: string[];
    import: {
        collection: string;
        query?: {
            key: string;
            val: string;
        }[];
    };
    subContent: {
        type: string;
        data: Record<string, CollElementModelData>;
    };
}

type CollElementDataEntry<T extends CollDefinitionFieldTypeIdent> = CollElementModelData[T];

export interface CollElementModel extends DatabaseModel {
    collection: string;
    data: Record<string, CollElementDataEntry<any>>;
    dataOverwrites: {
        query: Record<string, any>
        overwrites: Record<string, CollElementDataEntry<any>>
    }[];
}