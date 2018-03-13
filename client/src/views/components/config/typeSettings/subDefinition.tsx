import * as React           from 'react';
import ComponentFieldList   from '../componentFieldList';
import { TypeSettingProps } from './typeOptionProps';

export default ({ typeOptions, onChange }: TypeSettingProps<'subDefinition'>) => (
    <ComponentFieldList
        properties={typeOptions.props || []}
        onDataChange={props => onChange({ props })}
    />
);