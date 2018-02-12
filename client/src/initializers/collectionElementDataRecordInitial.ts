import {
    CollDefinitionModel,
    CollDefinitionModelField
}                                       from '../../../connector/common/src/collectionDefinition.model';
import { CollElementModelDataRecord }   from '../../../connector/common/src/collectionElement.model';
import { CollDefinitionFieldTypeIdent } from '../../../connector/common/src/fieldTypes';

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
    file: '', // update
    image: '', // update
    select: '',
    selectMultiple: [],
    tags: [],
    import: {
        collection: ''
    },
    subContent: (field) => {
        const options = field.typeOptions.options;
        return {
            collection: options.length === 1 ? options[0] : '',
            data: {},
            dataOverwrites: []
        };
    }
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