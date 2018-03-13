import { DatabaseModel }      from './_base';
import { ComponentPropTypes } from './fieldTypes';

export interface ElementDataRecordTypeByProp {
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
        filter: Record<string, ElementModelDataRecord>;
    };
    subContent: ElementModel;
    subDefinition: Record<string, ElementModelDataRecord>;
}

export type ElementModelDataRecord<T extends ComponentPropTypes = any> = ElementDataRecordTypeByProp[T];

export interface ElementModel extends DatabaseModel {
    collection: string;
    data: Record<string, ElementModelDataRecord>;
    dataOverwrites: {
        query: Record<string, any>
        overwrites: Record<string, ElementModelDataRecord>
    }[];
}