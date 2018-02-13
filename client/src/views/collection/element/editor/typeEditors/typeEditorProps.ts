import {
    CollDefinitionFieldTypeIdent,
    CollDefinitionModelField,
    CollElementDataEntry
} from 'props-cms.connector-common';

export type TypeElementEditorProps<TKey extends CollDefinitionFieldTypeIdent> = {
    field: CollDefinitionModelField;
    record?: CollElementDataEntry<TKey>;
    onDataChange: (newData: CollElementDataEntry<TKey>) => void;
};

export type TypeEditorComponent<TKey extends CollDefinitionFieldTypeIdent>
    = React.ComponentType<TypeElementEditorProps<TKey>> | undefined;