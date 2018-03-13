import * as React              from 'react';
import CollDefinitionFieldList from '../componentFieldList';
import { TypeSettingProps }    from './typeOptionProps';

export default ({ typeOptions, onChange }: TypeSettingProps<'subDefinition'>) => (
    <CollDefinitionFieldList
        properties={typeOptions.props || []}
        onDataChange={props => onChange({ props })}
    />
);