import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Paper
}                                      from 'material-ui';
import * as React                      from 'react';
import { CollDefinitionModelField }    from '../../../../models/collectionDefinition.model';
import { SimpleTextField }             from '../../../../util';
import { CollDefinitionFieldSettings } from './editorFieldSettings';

interface CollDefinitionFieldEditorProps {
    field: CollDefinitionModelField;
    onDataChange: (data: Partial<CollDefinitionModelField>) => void;
    onDelete: () => void;
}

export class CollDefinitionFieldEditor extends React.PureComponent<CollDefinitionFieldEditorProps, {
    editorOpen: boolean;
}> {

    constructor(props: CollDefinitionFieldEditorProps) {
        super(props);
        this.state = {
            editorOpen: false
        };
    }

    render() {
        const { field, onDataChange, onDelete } = this.props;

        return (
            <div>
                {this.state.editorOpen && (
                    <Dialog
                        open={true}
                        onClose={() => this.setState({ editorOpen: false })}
                    >
                        <DialogTitle>
                            {field.key}
                        </DialogTitle>
                        <DialogContent>
                            <CollDefinitionFieldSettings
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
                <Paper
                    style={{
                        margin: '0.5rem',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
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
                    <div style={{ flexShrink: 0 }}>
                        <IconButton onClick={() => this.setState({ editorOpen: true })}>
                            <Icon>settings</Icon>
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