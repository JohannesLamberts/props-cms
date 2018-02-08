import { DatabaseModel } from './_base';

export const CollDefinitionFieldTypes = {
    text: 'Text',
    textArea: 'Text (mehrzeilig)',
    boolean: 'Boolean',
    number: 'Number',
    color: 'Color',
    time: 'Time',
    date: 'Date',
    file: 'File',
    image: 'Image',
    select: 'Select',
    tags: 'Tags',
    import: 'Import',
    subContent: 'Content'
};

export type CollDefinitionFieldTypeIdent = keyof typeof CollDefinitionFieldTypes;

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
    subContent: undefined;
}

export const CollDefinitionFieldOptionsInitials: CollDefinitionFieldOptions = {
    text: undefined,
    textArea: undefined,
    boolean: undefined,
    number: undefined,
    color: undefined,
    time: undefined,
    date: undefined,
    file: undefined,
    image: undefined,
    select: {
        values: []
    },
    selectMultiple: {
        values: []
    },
    tags: undefined,
    import: undefined,
    subContent: undefined
};

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
    ident: string;
    root: boolean;
    label: string;
    icon: string;
    color: string;
    description: string;
    fields: CollDefinitionModelField[];
}