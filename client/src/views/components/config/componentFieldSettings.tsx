import {
    FormControlLabel,
    Switch,
    Typography,
    WithStyles,
    withStyles
}                                   from 'material-ui';
import { CollDefinitionModelField } from 'props-cms.connector-common';
import * as React                   from 'react';
import { SimpleTextField }          from '../../../util/index';
import formComponents               from './typeSettings/index';
import { TypeSettingsComponent }    from './typeSettings/typeOptionProps';

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
            <SimpleTextField
                TextFieldProps={{ fullWidth: true }}
                label={'Label'}
                value={field.label}
                onBlur={label => onDataChange({ label })}
            />
            <SimpleTextField
                TextFieldProps={{ fullWidth: true }}
                label={'Hilfe-Text'}
                value={field.helpText}
                onBlur={helpText => onDataChange({ helpText })}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={field.allowOverwrite}
                        onChange={(event, allowOverwrite) => onDataChange({ allowOverwrite })}
                    />
                }
                label={'Overwrite'}
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