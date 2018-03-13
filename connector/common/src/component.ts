import { DatabaseModel }      from './_base';
import { ComponentPropTypes } from './fieldTypes';

export interface ComponentPropTypeOptions {
    text: undefined;
    textArea: undefined;
    boolean: undefined;
    number: undefined;
    color: undefined;
    time: undefined;
    date: undefined;
    dateTime: undefined;
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
    subDefinition: {
        fields: ComponentProperty[];
    };
    // disable primitive options like import: string
    // allows general use of partial updates
    [key: string]: undefined | Record<string, any>;
}

export interface ComponentProperty<TKey extends ComponentPropTypes = any> {
    key: string;
    label: string;
    helpText: string;
    type: TKey;
    typeOptions: ComponentPropTypeOptions[TKey];
    isArray: boolean;
    allowOverwrite: boolean;
}

export interface ComponentModel extends DatabaseModel {
    root: boolean;
    label: string;
    icon: string;
    color: string;
    description: string;
    props: ComponentProperty[];
}