import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Paper,
    WithStyles,
    withStyles
}                                   from 'material-ui';
import { CollDefinitionModelField } from 'props-cms.connector-common';
import * as React                   from 'react';
import { SimpleTextField }          from '../../../util/index';
import CollDefinitionFieldList      from './editorFieldSettings';

const styles = {
    row: {
        margin: '0.5rem',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    } as React.CSSProperties,
    rowActions: {
        flexShrink: 0
    }
};

const decorateStyles = withStyles(styles);

type CollDefinitionFieldEditorProps = {
    field: CollDefinitionModelField;
    onDataChange: (data: Partial<CollDefinitionModelField>) => void;
    onDelete: () => void;
} & WithStyles<keyof typeof styles>;

class CollDefinitionFieldEditor extends React.PureComponent<CollDefinitionFieldEditorProps, {
    editorOpen: boolean;
}> {

    constructor(props: CollDefinitionFieldEditorProps) {
        super(props);
        this.state = {
            editorOpen: false
        };
    }

    render() {

        const { field, onDataChange, onDelete, classes } = this.props;

        return (
            <div>
                {this.state.editorOpen && (
                    <Dialog
                        open={true}
                        onClose={() => this.setState({ editorOpen: false })}
                    >
                        <DialogTitle>
                            {field.label}
                        </DialogTitle>
                        <DialogContent>
                            <CollDefinitionFieldList
                                field={field}
                                onDataChange={onDataChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({ editorOpen: false })}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Paper className={classes.row}>
                    <SimpleTextField
                        TextFieldProps={{
                            fullWidth: true,
                            InputProps: {
                                disableUnderline: true
                            }
                        }}
                        label={'Key'}
                        value={field.key}
                        onBlur={value => onDataChange({ key: value })}
                    />
                    <SimpleTextField
                        TextFieldProps={{
                            fullWidth: true,
                            InputProps: {
                                disableUnderline: true
                            }
                        }}
                        label={'Label'}
                        value={field.label}
                        onBlur={value => onDataChange({ label: value })}
                    />
                    <div className={classes.rowActions}>
                        <IconButton onClick={() => this.setState({ editorOpen: true })}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton onClick={onDelete}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default decorateStyles(CollDefinitionFieldEditor);