import {
    MenuItem,
    Select
}                                   from 'material-ui';
import { ComponentPropTypeOptions } from 'props-cms.connector-common';
import * as React                   from 'react';
import { TypeElementEditorProps }   from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'selectMultiple'>) => (
    <Select
        fullWidth={true}
        multiple={true}
        value={(record || [])}
        onChange={event => {
            onDataChange(event.target.value as any as string[]);
        }}
        renderValue={(selected: string[]) => selected.join(', ')}
    >
        {(prop.typeOptions as ComponentPropTypeOptions['select'])
            .values
            .map(value => (
                <MenuItem
                    key={value}
                    value={value}
                >
                    {(record || []).indexOf(value) === -1 ? value : <b>{value}</b>}
                </MenuItem>
            ))}
    </Select>
);