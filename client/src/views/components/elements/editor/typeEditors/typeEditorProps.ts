import {
    ComponentProperty,
    ComponentPropTypes,
    ElementModelDataRecord
} from 'props-cms.connector-common';

export type TypeElementEditorProps<TKey extends ComponentPropTypes> = {
    prop: ComponentProperty<TKey>;
    record?: ElementModelDataRecord<TKey>;
    onDataChange: (newData: ElementModelDataRecord<TKey>) => void;
};

export type TypeEditorComponent<TKey extends ComponentPropTypes>
    = React.ComponentType<TypeElementEditorProps<TKey>> | undefined;