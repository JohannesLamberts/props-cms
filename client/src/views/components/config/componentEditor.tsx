import {
    Button,
    Icon,
    IconButton,
    withStyles,
    WithStyles
}                              from 'material-ui';
import { ComponentModel }      from 'props-cms.connector-common';
import * as React              from 'react';
import { connect }             from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                              from 'react-router';
import { Link }                from 'react-router-dom';
import { compose }             from 'redux';
import { DatabasePatch }       from '../../../redux/database/database.actions';
import { withDatabaseConnect } from '../../../redux/database/database.decorate';
import {
    ColorTextInput,
    PaperWithHead,
    SimpleTextField
}                              from '../../../util/index';
import ComponentPropsEditor    from './componentFieldList';

const styles = {
    root: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-start',
        '& > *:not(:last-child)': {
            marginRight: '1rem'
        }
    } as React.CSSProperties,
    definitionEditArea: {
        padding: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    definitionEditAreaHead: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    } as React.CSSProperties,
    fieldEditArea: {
        flexGrow: 1
    }
};

type ComponentEditorProps<TData = any> = {
    onMount: () => void;
    onSave: (data: ComponentModel) => void;
    component: ComponentModel | undefined;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class ComponentEditor extends React.PureComponent<ComponentEditorProps, {
    editComponent: ComponentModel | undefined;
}> {

    constructor(props: ComponentEditorProps) {
        super(props);
        this.state = {
            editComponent: props.component
        };
        this._handleSave = this._handleSave.bind(this);
        this._handlePartialChange = this._handlePartialChange.bind(this);
    }

    componentWillReceiveProps(props: ComponentEditorProps) {
        this.setState(
            {
                editComponent: props.component
            });
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        const { onSave, classes } = this.props;
        const { editComponent } = this.state;

        if (!editComponent) {
            return null;
        }

        return (
            <div className={classes.root}>
                <PaperWithHead
                    classNameContent={classes.definitionEditArea}
                    label={editComponent.label || editComponent._id}
                    action={(
                        editComponent.root && (
                            <Link
                                style={{ float: 'right' }}
                                to={`/collection/${editComponent._id}/elements`}
                            >
                                <IconButton>
                                    <Icon>view_carousel</Icon>
                                </IconButton>
                            </Link>
                        )
                    )}
                >
                    <SimpleTextField
                        label={'Label'}
                        value={editComponent.label}
                        onBlur={label => this._handlePartialChange({ label })}
                    />
                    <ColorTextInput
                        label={'Farbe'}
                        value={editComponent.color}
                        onChange={color => this._handlePartialChange({ color })}
                    />
                    <SimpleTextField
                        TextFieldProps={{
                            rowsMax: 100
                        }}
                        multiline={true}
                        label={'Beschreibung'}
                        value={editComponent.description}
                        onBlur={description => this._handlePartialChange({ description })}
                    />
                    <Button
                        onClick={this._handleSave}
                        fullWidth={true}
                        variant={'raised'}
                    >
                        Speichern
                    </Button>
                </PaperWithHead>
                <div className={classes.fieldEditArea}>
                    <ComponentPropsEditor
                        properties={editComponent.props || []}
                        onDataChange={props => this._handlePartialChange({ props })}
                    />
                </div>
            </div>
        );
    }

    private _handlePartialChange(update: Partial<ComponentModel>) {
        this.setState(
            {
                editComponent: Object.assign({}, this.state.editComponent, update)
            });
    }

    private _handleSave() {
        if (!this.state.editComponent) {
            throw new Error(`Can't save before recieved data from server`);
        }
        this.props.onSave(this.state.editComponent);
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    (props: RouteComponentProps<{ collIdent: string }>) => ({
        component: {
            collection: 'component' as 'component',
            id: props.match.params.collIdent
        }
    })
);

const decorateStore = connect(
    null,
    (dispatch, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            onSave: data => {
                dispatch(DatabasePatch('component', collIdent, data));
            }
        };
    });

export default compose(withRouter,
                       decorateStore,
                       decorateDatabase,
                       decorateStyle)(ComponentEditor);