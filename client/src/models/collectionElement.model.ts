import { DatabaseModel }                from './_base';
import { CollDefinitionFieldTypeIdent } from './collectionDefinition.model';

export interface CollElementModelData {
    text: string;
    textArea: string;
    boolean: boolean;
    number: number;
    color: string;
    time: Date | undefined;
    date: Date | undefined;
    file: string; // update
    image: string; // update
    select: string;
    selectMultiple: string[];
    tags: string[];
    import: {
        collection: string;
        query?: {
            key: string;
            val: string;
        }[];
    };
    subContent: CollElementModel;
}

export const CollElementModelDataInitials: CollElementModelData = {
    text: '',
    textArea: '',
    boolean: false,
    number: 0,
    color: '',
    time: undefined,
    date: undefined,
    file: '', // update
    image: '', // update
    select: '',
    selectMultiple: [],
    tags: [],
    import: {
        collection: ''
    },
    subContent: {
        collection: '',
        data: {},
        dataOverwrites: []
    }
};

export type CollElementDataEntry<T extends CollDefinitionFieldTypeIdent = any> = CollElementModelData[T];

export interface CollElementModel extends DatabaseModel {
    collection: string;
    data: Record<string, CollElementDataEntry>;
    dataOverwrites: {
        query: Record<string, any>
        overwrites: Record<string, CollElementDataEntry>
    }[];
}