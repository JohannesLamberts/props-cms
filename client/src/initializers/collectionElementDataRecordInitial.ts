import {
    ComponentModel,
    ComponentProperty,
    ComponentPropTypes,
    ElementModelDataRecord
} from 'props-cms.connector-common';

export const InitialElementModelDataRecord: {readonly [P in ComponentPropTypes]: (
    ElementModelDataRecord[P] | ((field: ComponentProperty<P>) => ElementModelDataRecord[P])
    )} = {
    text: '',
    textArea: '',
    boolean: false,
    number: 0,
    color: '',
    time: undefined,
    date: undefined,
    dateTime: undefined,
    file: {
        provider: '',
        id: ''
    },
    image: {
        provider: '',
        id: '',
        maxHeight: 0,
        maxWidth: 0
    },
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
            collection: options.length === 1
                ? options[0]
                : '',
            data: {},
            dataOverwrites: []
        };
    },
    subDefinition: {}
};

export const InitialElementData = (collDefinition: ComponentModel): Record<string, any> => {
    const data: Record<string, any> = {};
    for (const field of collDefinition.props) {
        data[field.key] = InitialFieldData(field);
    }
    return data;
};

export const InitialFieldData = (field: ComponentProperty): any => {
    if (field.isArray) {
        return [];
    } else {
        return field.isArray
            ? []
            : InitialFieldTypeData(field);
    }
};

export const InitialFieldTypeData = (field: ComponentProperty): any => {
    const initializer = InitialElementModelDataRecord[field.type];
    if (typeof initializer === 'function') {
        return initializer(field);
    }
    return initializer;
};