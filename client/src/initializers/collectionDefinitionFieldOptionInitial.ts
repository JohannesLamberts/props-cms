import { ComponentPropTypeOptions } from 'props-cms.connector-common';

export const InitialCollDefinitionFieldOptions: Readonly<ComponentPropTypeOptions> = {
    text: undefined,
    textArea: undefined,
    boolean: undefined,
    number: undefined,
    color: undefined,
    time: undefined,
    date: undefined,
    dateTime: undefined,
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
    subContent: {
        options: []
    },
    subDefinition: {
        props: []
    }
};