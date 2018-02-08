import {
    FormControlLabel,
    Switch,
    TextField,
    MenuItem
}                                           from 'material-ui';
import * as React                           from 'react';
import {
    CollDefinitionFieldOptions,
    CollDefinitionModelField
}                                           from '../../../../models/collectionDefinition.model';
import {
    CollElementDataEntry,
    CollElementModelData
}                                           from '../../../../models/collectionElement.model';
import { SimpleTextField }                  from '../../../../util/index';
import { CollElementEditorFieldSubContent } from './editorFieldSubContent';

interface CollElementEditorFieldProps {
    field: CollDefinitionModelField;
    data: CollElementDataEntry;
    onDataChange: (newData: CollElementDataEntry) => void;
}

export const CollElementEditorField = (props: CollElementEditorFieldProps) => {

    const { field, data, onDataChange } = props;

    switch (field.type) {
        case 'text':
            return (
                <SimpleTextField
                    TextFieldProps={{
                        fullWidth: true
                    }}
                    label={field.label}
                    value={data as string}
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
                    value={data as string}
                    onBlur={onDataChange}
                />
            );
        case 'select':
            return (
                <TextField
                    fullWidth={true}
                    select={true}
                    label={field.label}
                    value={data || '%NONE%'}
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
                            checked={data}
                            onChange={(event, checked) => onDataChange(checked)}
                        />
                    }
                    label={field.label}
                />
            );
        case 'subContent':
            return (
                <CollElementEditorFieldSubContent
                    data={data as CollElementModelData['subContent']}
                    onDataChange={onDataChange}
                />
            );
        default:
            return <span>NOT IMPLEMENTED: {field.type}</span>;
    }
};