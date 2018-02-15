import {
    CollDefinitionFieldTypeIdent,
    CollDefinitionModel,
    CollDefinitionModelField,
    CollElementModelDataRecord
} from 'props-cms.connector-common';

export const InitialCollElementModelDataRecord: {[P in CollDefinitionFieldTypeIdent]: (
    CollElementModelDataRecord[P] | ((field: CollDefinitionModelField<P>) => CollElementModelDataRecord[P])
    )} = {
    text: '',
    textArea: '',
    boolean: false,
    number: 0,
    color: '',
    time: undefined,
    date: undefined,
    dateTime: undefined,
    file: '', // update
    image: '', // update
    select: '',
    selectMultiple: [],
    tags: [],
    import: {
        collection: '',
        filter: {}
    },
    subContent: (field) => {
        const options = field.typeOptions.options;
        return {
            collection: options.length === 1 ? options[0] : '',
            data: {},
            dataOverwrites: []
        };
    },
    subDefinition: {}
};

export const InitialElementData = (collDefinition: CollDefinitionModel): Record<string, any> => {
    const data: Record<string, any> = {};
    for (const field of collDefinition.fields) {
        data[field.key] = InitialFieldData(field);
    }
    return data;
};

export const InitialFieldData = (field: CollDefinitionModelField): any => {
    if (field.isArray) {
        return [];
    } else {
        return field.isArray ? [] : InitialFieldTypeData(field);
    }
};

export const InitialFieldTypeData = (field: CollDefinitionModelField): any => {
    const initializer = InitialCollElementModelDataRecord[field.type];
    if (typeof initializer === 'function') {
        return initializer(field);
    }
    return initializer;
};