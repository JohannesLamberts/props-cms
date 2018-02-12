import { CollDefinitionFieldOptions } from '../../../connector/common/src/collectionDefinition.model';

export const InitialCollDefinitionFieldOptions: CollDefinitionFieldOptions = {
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
    subContent: {
        options: []
    }
};