import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Paper,
    Table,
    withStyles,
    WithStyles
}                                    from 'material-ui';
import { CollDefinitionModelField }  from 'props-cms.connector-common';
import * as React                    from 'react';
import {
    SimpleTableBody,
    SimpleTableHeader
}                                    from '../../../util';
import { ComponentAddFieldFooter }   from './componentAddFieldFooter';
import ComponentFieldSettings        from './componentFieldSettings';
import { CollDefinitionFieldTypeUI } from './typeNames';

const randomId = (length: number = 16): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

const styles = {
    table: {
        '& td:last-child': {
            textAlign: 'center'
        },
        '& th:last-child': {
            textAlign: 'center'
        },
        '& tfoot td': {
            paddingRight: '0',
            verticalAlign: 'bottom',
            '& > *': {
                width: '100%'
            }
        }
    }
};

const decorateStyle = withStyles(styles);

type ComponentFieldListProps = {
    fields: CollDefinitionModelField[];
    onDataChange: (data: CollDefinitionModelField[]) => void;
} & WithStyles<keyof typeof styles>;

class ComponentFieldList extends React.PureComponent<ComponentFieldListProps, {
    dialogFieldKey: string | null;
}> {

    constructor(props: ComponentFieldListProps) {
        super(props);
        this.state = {
            dialogFieldKey: null
        };
        this._closeDialog = this._closeDialog.bind(this);
    }

    render() {

        const { fields, onDataChange, classes } = this.props;
        const { dialogFieldKey } = this.state;

        let dialogField: CollDefinitionModelField | null = null;
        if (dialogFieldKey) {
            for (let field of fields) {
                if (field.key === dialogFieldKey) {
                    dialogField = field;
                    break;
                }
            }
        }

        return (
            <div>
                {dialogField && (
                    <Dialog
                        open={true}
                        onClose={this._closeDialog}
                    >
                        <DialogTitle>
                            Einstellungen
                        </DialogTitle>
                        <DialogContent>
                            <ComponentFieldSettings
                                field={dialogField}
                                onDataChange={partial => {
                                    const shallow = fields.slice();
                                    shallow[shallow.indexOf(dialogField!)]
                                        = Object.assign({},
                                                        dialogField,
                                                        partial);
                                    onDataChange(shallow);
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this._closeDialog}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Paper>
                    <Table className={classes.table}>
                        <SimpleTableHeader>
                            {['Typ', 'Label', 'Repeat', 'Overwrite', 'Info', 'ID', 'Actions']}
                        </SimpleTableHeader>
                        <SimpleTableBody
                            data={fields}
                        >
                            {(field: CollDefinitionModelField) => [
                                (
                                    <span
                                        style={{
                                            backgroundColor: CollDefinitionFieldTypeUI[field.type].color,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '2px'
                                        }}
                                    >
                                        {CollDefinitionFieldTypeUI[field.type].name}
                                    </span>
                                ),
                                field.label,
                                field.isArray && <Icon>check</Icon>,
                                field.allowOverwrite && <Icon>check</Icon>,
                                field.helpText,
                                field.key,
                                (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexFlow: 'row nowrap'
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                this.setState({ dialogFieldKey: field.key })}
                                        >
                                            <Icon>settings</Icon>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                const shallow = fields.slice();
                                                shallow.splice(fields.indexOf(field), 1);
                                                onDataChange(shallow);
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </div>
                                )
                            ]}
                        </SimpleTableBody>
                        <ComponentAddFieldFooter
                            onSave={field => {
                                onDataChange(
                                    [
                                        ...fields,
                                        Object.assign(
                                            {},
                                            field, {
                                                id: randomId()
                                            })
                                    ]
                                );
                            }}
                        />
                    </Table>
                </Paper>
            </div>
        );
    }

    private _closeDialog() {
        this.setState({ dialogFieldKey: null });
    }
}

export default decorateStyle(ComponentFieldList);