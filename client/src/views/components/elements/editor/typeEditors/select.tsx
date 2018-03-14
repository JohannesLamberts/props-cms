import {
    MenuItem,
    TextField
}                                   from 'material-ui';
import { ComponentPropTypeOptions } from 'props-cms.connector-common';
import * as React                   from 'react';
import { TypeElementEditorProps }   from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'select'>) => (
    <TextField
        fullWidth={true}
        select={true}
        label={prop.label}
        value={record || '%NONE%'}
        onChange={event => {
            onDataChange(event.target.value);
        }}
    >
        {(prop.typeOptions as ComponentPropTypeOptions['select'])
            .values
            .map(value => (
                <MenuItem
                    key={value}
                    value={value}
                >
                    {value}
                </MenuItem>
            ))}
    </TextField>
);