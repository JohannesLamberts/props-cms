import {
    FormControlLabel,
    MenuItem,
    Switch,
    TextField
}                                          from 'material-ui';
import * as React                          from 'react';
import {
    CollDefinitionFieldOptionsInitials,
    CollDefinitionFieldTypeIdent,
    CollDefinitionFieldTypes,
    CollDefinitionModelField
}                                          from '../../../../models/collectionDefinition.model';
import { SimpleTextField }                 from '../../../../util';
import { CollDefinitionFieldTypeSettings } from './editorFieldTypeSettings';

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
                                     typeOptions: CollDefinitionFieldOptionsInitials[newValue]
                                 });
                }}
            >
                {Object.keys(CollDefinitionFieldTypes).map(fieldTypeIdent => (
                    <MenuItem
                        key={fieldTypeIdent}
                        value={fieldTypeIdent}
                    >
                        {CollDefinitionFieldTypes[fieldTypeIdent]}
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