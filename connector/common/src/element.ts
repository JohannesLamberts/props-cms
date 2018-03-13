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
        filter: Record<string, ElementDataRecord>;
    };
    subContent: ElementModel;
    subDefinition: Record<string, ElementDataRecord>;
}

export type ElementDataRecord<T extends ComponentPropTypes = any> = ElementDataRecordTypeByProp[T];

export interface ElementModel extends DatabaseModel {
    collection: string;
    data: Record<string, ElementDataRecord>;
    dataOverwrites: {
        query: Record<string, any>
        overwrites: Record<string, ElementDataRecord>
    }[];
}