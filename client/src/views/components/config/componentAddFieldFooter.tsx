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
}                                          from 'material-ui';
import {
    ComponentProperty,
    ComponentPropTypes
}                                          from 'props-cms.connector-common';
import * as React                          from 'react';
import { InitialComponentPropertyOptions } from '../../../initializers/collectionDefinitionFieldOptionInitial';
import { SimpleTextField }                 from '../../../util';
import { ComponentPropTypeUI }             from './typeNames';

interface ComponentAddFieldFooterProps {
    onSave: (field: ComponentProperty) => void;
}

export class ComponentAddFieldFooter extends React.PureComponent<ComponentAddFieldFooterProps, {
    field: ComponentProperty;
}> {

    constructor(props: ComponentAddFieldFooterProps) {
        super(props);
        this.state = {
            field: {
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

        const update = (partial: Partial<ComponentProperty>) => {
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
                                const newValue = event.target.value as ComponentPropTypes;
                                update(
                                    {
                                        type: newValue,
                                        typeOptions: InitialComponentPropertyOptions[newValue]
                                    });
                            }}
                        >
                            {Object.keys(ComponentPropTypeUI).map(fieldTypeIdent => (
                                <MenuItem
                                    key={fieldTypeIdent}
                                    value={fieldTypeIdent}
                                >
                                    {ComponentPropTypeUI[fieldTypeIdent].name}
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
                        <div>
                            <IconButton onClick={this._onSave}>
                                <Icon>add</Icon>
                            </IconButton>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        );
    }

    private _onSave() {
        this.props.onSave(this.state.field);
    }
}