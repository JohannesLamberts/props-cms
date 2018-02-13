import { CollDefinitionFieldTypeIdent } from 'props-cms.connector-common';
import { CollDefinitionFieldOptions }   from '../../../../../../connector/common/src';

export type TypeSettingProps<TKey extends CollDefinitionFieldTypeIdent> = {
    typeOptions: CollDefinitionFieldOptions[TKey];
    onChange: (data: Partial<CollDefinitionFieldOptions[TKey]>) => void;
};