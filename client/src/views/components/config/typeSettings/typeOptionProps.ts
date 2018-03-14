import {
    ComponentPropTypeOptions,
    ComponentPropTypes
} from 'props-cms.connector-common';

export type TypeSettingProps<TKey extends ComponentPropTypes> = {
    typeOptions: ComponentPropTypeOptions[TKey];
    onChange: (data: Partial<ComponentPropTypeOptions[TKey]>) => void;
};

export type TypeSettingsComponent<TKey extends ComponentPropTypes>
    = React.ComponentType<TypeSettingProps<TKey>> | undefined;