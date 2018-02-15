import {
    FormControlLabel,
    MenuItem,
    Switch,
    TextField,
    Typography,
    WithStyles,
    withStyles
}                                            from 'material-ui';
import {
    CollDefinitionFieldTypeIdent,
    CollDefinitionModelField
}                                            from 'props-cms.connector-common';
import * as React                            from 'react';
import { InitialCollDefinitionFieldOptions } from '../../../initializers/collectionDefinitionFieldOptionInitial';
import { SimpleTextField }                   from '../../../util/index';
import formComponents                        from './typeSettings/index';
import { TypeSettingsComponent }             from './typeSettings/typeOptionProps';

const CollDefinitionFieldTypeNames: Record<CollDefinitionFieldTypeIdent, string> = {
    text: 'Text',
    textArea: 'Text (mehrzeilig)',
    boolean: 'Boolean',
    number: 'Number',
    color: 'Color',
    time: 'Time',
    date: 'Date',
    dateTime: 'DateTime',
    file: 'File',
    image: 'Image',
    select: 'Select (1)',
    selectMultiple: 'Select (n)',
    tags: 'Tags',
    import: 'Import',
    subContent: 'Content',
    subDefinition: 'Definition'
};

const styles = {
    typeOptions: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        padding: '12px'
    }
};

const decorateStyles = withStyles(styles);

const CollDefinitionFieldSettings = (props: {
    field: CollDefinitionModelField;
    onDataChange: (data: Partial<CollDefinitionModelField>) => void;

} & WithStyles<keyof typeof styles>) => {

    const { field, onDataChange, classes } = props;
    const { type, typeOptions } = field;

    let FormComponent = formComponents[type] as TypeSettingsComponent<any>;

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
            {FormComponent && (
                <div className={classes.typeOptions}>
                    <Typography variant={'caption'}>
                        OPTIONEN
                    </Typography>
                    <FormComponent
                        typeOptions={typeOptions}
                        onChange={partial => {
                            onDataChange({ typeOptions: Object.assign({}, typeOptions, partial) });
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default decorateStyles(CollDefinitionFieldSettings);