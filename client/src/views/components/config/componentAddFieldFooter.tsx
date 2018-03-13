import {
    FormControlLabel,
    Icon,
    IconButton,
    MenuItem,
    Switch,
    TableCell,
    TableFooter,
    TableRow,
    TextField
}                                            from 'material-ui';
import {
    CollDefinitionFieldTypeIdent,
    CollDefinitionModelField
}                                            from 'props-cms.connector-common';
import * as React                            from 'react';
import { InitialCollDefinitionFieldOptions } from '../../../initializers/collectionDefinitionFieldOptionInitial';
import { SimpleTextField }                   from '../../../util';
import { CollDefinitionFieldTypeUI }         from './typeNames';

interface ComponentAddFieldFooterProps {
    onSave: (field: CollDefinitionModelField) => void;
}

export class ComponentAddFieldFooter extends React.PureComponent<ComponentAddFieldFooterProps, {
    field: CollDefinitionModelField;
}> {

    constructor(props: ComponentAddFieldFooterProps) {
        super(props);
        this.state = {
            field: {
                id: '',
                key: '',
                label: '',
                helpText: '',
                type: 'text',
                typeOptions: undefined,
                isArray: false,
                allowOverwrite: false
            }
        };
        this._onSave = this._onSave.bind(this);
    }

    render() {

        const {} = this.props;
        const { field } = this.state;

        const update = (partial: Partial<CollDefinitionModelField>) => {
            this.setState({ field: Object.assign({}, this.state.field, partial) });
        };

        return (
            <TableFooter>
                <TableRow>
                    <TableCell>
                        <TextField
                            required={true}
                            select={true}
                            label={'Typ'}
                            value={field.type}
                            onChange={event => {
                                const newValue = event.target.value as CollDefinitionFieldTypeIdent;
                                update(
                                    {
                                        type: newValue,
                                        typeOptions: InitialCollDefinitionFieldOptions[newValue]
                                    });
                            }}
                        >
                            {Object.keys(CollDefinitionFieldTypeUI).map(fieldTypeIdent => (
                                <MenuItem
                                    key={fieldTypeIdent}
                                    value={fieldTypeIdent}
                                >
                                    {CollDefinitionFieldTypeUI[fieldTypeIdent].name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </TableCell>
                    <TableCell>
                        <SimpleTextField
                            label={'Label'}
                            required={true}
                            value={field.label}
                            onBlur={label => update({ label })}
                        />
                    </TableCell>
                    <TableCell>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={field.isArray}
                                    onChange={(event, isArray) => update({ isArray })}
                                />
                            }
                            label={'Repeat'}
                        />
                    </TableCell>
                    <TableCell>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={field.allowOverwrite}
                                    onChange={(event, allowOverwrite) => update({ allowOverwrite })}
                                />
                            }
                            label={'Overwrite'}
                        />
                    </TableCell>
                    <TableCell>
                        <SimpleTextField
                            TextFieldProps={{ fullWidth: true }}
                            label={'Info'}
                            value={field.helpText}
                            onBlur={helpText => update({ helpText })}
                        />
                    </TableCell>
                    <TableCell>
                        <SimpleTextField
                            required={true}
                            TextFieldProps={{ fullWidth: true }}
                            label={'ID'}
                            value={field.key}
                            onBlur={key => update({ key })}
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={this._onSave}>
                            <Icon>add</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableFooter>
        );
    }

    private _onSave() {
        this.props.onSave(this.state.field);
    }
}