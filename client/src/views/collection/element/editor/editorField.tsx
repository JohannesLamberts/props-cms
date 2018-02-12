import {
    FormControlLabel,
    MenuItem,
    Switch,
    TextField
}                                           from 'material-ui';
import {
    CollDefinitionFieldOptions,
    CollDefinitionModelField,
    CollElementDataEntry,
    CollElementModelDataRecord
}                                           from 'props-cms.connector-common';
import * as React                           from 'react';
import { SimpleTextField }                  from '../../../../util/index';
import { CollElementEditorFieldSubContent } from './editorFieldSubContent';

interface CollElementEditorFieldProps {
    field: CollDefinitionModelField;
    record?: CollElementDataEntry;
    onDataChange: (newData: CollElementDataEntry) => void;
}

export const CollElementEditorField = (props: CollElementEditorFieldProps) => {

    const { field, record, onDataChange } = props;

    switch (field.type) {
        case 'text':
            return (
                <SimpleTextField
                    TextFieldProps={{
                        fullWidth: true
                    }}
                    label={field.label}
                    value={record as string}
                    onBlur={onDataChange}
                />
            );
        case 'textArea':
            return (
                <SimpleTextField
                    TextFieldProps={{
                        fullWidth: true
                    }}
                    multiline={true}
                    label={field.label}
                    value={record as string}
                    onBlur={onDataChange}
                />
            );
        case 'select':
            return (
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
        case 'boolean':
            return (
                <FormControlLabel
                    control={
                        <Switch
                            checked={record}
                            onChange={(event, checked) => onDataChange(checked)}
                        />
                    }
                    label={field.label}
                />
            );
        case 'subContent':
            return (
                <CollElementEditorFieldSubContent
                    typeOptions={field.typeOptions}
                    record={record as CollElementModelDataRecord['subContent']}
                    onDataChange={onDataChange}
                />
            );
        default:
            return <span>NOT IMPLEMENTED: {field.type}</span>;
    }
};