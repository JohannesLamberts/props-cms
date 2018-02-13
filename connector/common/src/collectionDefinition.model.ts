import { DatabaseModel }                from './_base';
import { CollDefinitionFieldTypeIdent } from './fieldTypes';

export interface CollDefinitionFieldOptions {
    text: undefined;
    textArea: undefined;
    boolean: undefined;
    number: undefined;
    color: undefined;
    time: undefined;
    date: undefined;
    file: undefined;
    image: undefined;
    select: {
        values: string[];
    };
    selectMultiple: {
        values: string[];
    };
    tags: undefined;
    import: undefined;
    subContent: {
        options: string[]
    };
    // disable primitive options like import: string
    // allows general use of partial updates
    [key: string]: undefined | Record<string, any>;
}

export interface CollDefinitionModelField<TKey extends CollDefinitionFieldTypeIdent = any> {
    id: string;
    key: string;
    label: string;
    helpText: string;
    type: TKey;
    typeOptions: CollDefinitionFieldOptions[TKey];
    isArray: boolean;
    allowOverwrite: boolean;
}

export interface CollDefinitionModel extends DatabaseModel {
    root: boolean;
    label: string;
    icon: string;
    color: string;
    description: string;
    fields: CollDefinitionModelField[];
}