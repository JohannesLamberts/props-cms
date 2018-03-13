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
}                                  from 'material-ui';
import { ComponentProperty }       from 'props-cms.connector-common';
import * as React                  from 'react';
import {
    SimpleTableBody,
    SimpleTableHeader
}                                  from '../../../util';
import { ComponentAddFieldFooter } from './componentAddFieldFooter';
import ComponentFieldSettings      from './componentFieldSettings';
import { ComponentPropTypeUI }     from './typeNames';

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
    properties: ComponentProperty[];
    onDataChange: (data: ComponentProperty[]) => void;
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

        const { properties, onDataChange, classes } = this.props;
        const { dialogFieldKey } = this.state;

        let dialogProp: ComponentProperty | null = null;
        if (dialogFieldKey) {
            for (let prop of properties) {
                if (prop.key === dialogFieldKey) {
                    dialogProp = prop;
                    break;
                }
            }
        }

        return (
            <div>
                {dialogProp && (
                    <Dialog
                        fullWidth={true}
                        maxWidth={false}
                        open={true}
                        onClose={this._closeDialog}
                    >
                        <DialogTitle>
                            Einstellungen
                        </DialogTitle>
                        <DialogContent>
                            <ComponentFieldSettings
                                field={dialogProp}
                                onDataChange={partial => {
                                    const shallow = properties.slice();
                                    shallow[shallow.indexOf(dialogProp!)]
                                        = Object.assign({},
                                                        dialogProp,
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
                            data={properties}
                        >
                            {(prop: ComponentProperty) => [
                                (
                                    <span
                                        style={{
                                            backgroundColor: ComponentPropTypeUI[prop.type].color,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '2px'
                                        }}
                                    >
                                        {ComponentPropTypeUI[prop.type].name}
                                    </span>
                                ),
                                prop.label,
                                prop.isArray && <Icon>check</Icon>,
                                prop.allowOverwrite && <Icon>check</Icon>,
                                prop.helpText,
                                prop.key,
                                (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexFlow: 'row nowrap'
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                this.setState({ dialogFieldKey: prop.key })}
                                        >
                                            <Icon>settings</Icon>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                const shallow = properties.slice();
                                                shallow.splice(properties.indexOf(prop), 1);
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
                            onSave={property => {
                                onDataChange(
                                    [
                                        ...properties,
                                        property
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