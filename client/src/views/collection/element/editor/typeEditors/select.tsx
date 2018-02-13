import {
    MenuItem,
    TextField
}                                     from 'material-ui';
import { CollDefinitionFieldOptions } from 'props-cms.connector-common';
import * as React                     from 'react';
import { TypeElementEditorProps }     from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'select'>) => (
    <TextField
        fullWidth={true}
        select={true}
        label={field.label}
        value={record || '%NONE%'}
        onChange={event => {
            onDataChange(event.target.value);
        }}
    >
        {(field.typeOptions as CollDefinitionFieldOptions['select'])
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