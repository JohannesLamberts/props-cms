import { DatabaseModel }                from './_base';
import { CollDefinitionFieldTypeIdent } from './fieldTypes';

export interface CollElementModelDataRecord {
    text: string;
    textArea: string;
    boolean: boolean;
    number: number;
    color: string;
    time: Date | undefined;
    date: Date | undefined;
    dateTime: Date | undefined;
    file: {
        provider: string;
        id: string;
    };
    image: {
        provider: string;
        id: string;
        maxHeight: number;
        maxWidth: number;
    };
    select: string;
    selectMultiple: string[];
    tags: string[];
    import: {
        collection: string;
        filter: Record<string, CollElementDataEntry>;
    };
    subContent: CollElementModel;
    subDefinition: Record<string, CollElementDataEntry>;
}

export type CollElementDataEntry<T extends CollDefinitionFieldTypeIdent = any> = CollElementModelDataRecord[T];

export interface CollElementModel extends DatabaseModel {
    collection: string;
    data: Record<string, CollElementDataEntry>;
    dataOverwrites: {
        query: Record<string, any>
        overwrites: Record<string, CollElementDataEntry>
    }[];
}