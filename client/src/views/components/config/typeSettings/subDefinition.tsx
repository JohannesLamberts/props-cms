import * as React              from 'react';
import CollDefinitionFieldList from '../componentFieldList';
import { TypeSettingProps }    from './typeOptionProps';

export default ({ typeOptions, onChange }: TypeSettingProps<'subDefinition'>) => (
    <CollDefinitionFieldList
        fields={typeOptions.fields || []}
        onDataChange={fields => onChange({ fields })}
    />
);