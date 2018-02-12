import {
    FormControlLabel,
    MenuItem,
    Switch,
    TextField
}                                            from 'material-ui';
import {
    CollDefinitionFieldTypeIdent,
    CollDefinitionModelField
}                                            from 'props-cms.connector-common';
import * as React                            from 'react';
import { InitialCollDefinitionFieldOptions } from '../../../initializers/collectionDefinitionFieldOptionInitial';
import { SimpleTextField }                   from '../../../util/index';
import { CollDefinitionFieldTypeSettings }   from './editorFieldTypeSettings';

const CollDefinitionFieldTypeNames: Record<CollDefinitionFieldTypeIdent, string> = {
    text: 'Text',
    textArea: 'Text (mehrzeilig)',
    boolean: 'Boolean',
    number: 'Number',
    color: 'Color',
    time: 'Time',
    date: 'Date',
    file: 'File',
    image: 'Image',
    select: 'Select (1)',
    selectMultiple: 'Select (n)',
    tags: 'Tags',
    import: 'Import',
    subContent: 'Content'
};

export const CollDefinitionFieldSettings = (props: {
    field: CollDefinitionModelField;
    onDataChange: (data: Partial<CollDefinitionModelField>) => void;

}) => {
    const { field, onDataChange } = props;
    return (
        <div>
            <TextField
                fullWidth={true}
                select={true}
                label={'Typ'}
                value={field.type}
                onChange={event => {
                    const newValue = event.target.value as CollDefinitionFieldTypeIdent;
                    onDataChange({
                                     type: newValue,
                                     typeOptions: InitialCollDefinitionFieldOptions[newValue]
                                 });
                }}
            >
                {Object.keys(CollDefinitionFieldTypeNames).map(fieldTypeIdent => (
                    <MenuItem
                        key={fieldTypeIdent}
                        value={fieldTypeIdent}
                    >
                        {CollDefinitionFieldTypeNames[fieldTypeIdent]}
                    </MenuItem>
                ))}
            </TextField>
            <SimpleTextField
                TextFieldProps={{ fullWidth: true }}
                label={'Hilfe-Text'}
                value={field.helpText}
                onBlur={helpText => onDataChange({ helpText })}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={field.isArray}
                        onChange={(event, isArray) => onDataChange({ isArray })}
                    />
                }
                label={'Repeat'}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={field.allowOverwrite}
                        onChange={(event, allowOverwrite) => onDataChange({ allowOverwrite })}
                    />
                }
                label={'Allow-Overwrite'}
            />
            <CollDefinitionFieldTypeSettings
                typeIdent={field.type}
                typeOptions={field.typeOptions}
                onTypeDataChange={typeOptions => onDataChange({ typeOptions })}
            />
        </div>
    );
};