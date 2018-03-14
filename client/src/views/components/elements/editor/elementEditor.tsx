import {
    Button,
    CircularProgress,
    Icon,
    IconButton,
    withStyles,
    WithStyles
}                              from 'material-ui';
import {
    ComponentModel,
    ElementModel
}                              from 'props-cms.connector-common';
import * as React              from 'react';
import { connect }             from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                              from 'react-router';
import { Link }                from 'react-router-dom';
import { compose }             from 'redux';
import { DatabasePatch }       from '../../../../redux/database/database.actions';
import { withDatabaseConnect } from '../../../../redux/database/database.decorate';
import { PaperWithHead }       from '../../../../util';
import ElementModelEditor      from './editorContent';

const collectionKey = 'element';

const styles = {
    root: {
        width: '100%'
    },
    content: {
        padding: '1rem'
    }
};

const decorateStyles = withStyles(styles);

type ElementEditorProps<TData = any> = {
    onMount: () => void;
    onSave: (data: Partial<ElementModel>) => void;
    element: ElementModel | undefined;
    component: ComponentModel | undefined;
} & WithStyles<keyof typeof styles>;

class ElementEditor extends React.PureComponent<ElementEditorProps, {
    editElement: ElementModel | undefined
}> {

    constructor(props: ElementEditorProps) {
        super(props);
        this.state = {
            editElement: props.element
        };
        this._handleSave = this._handleSave.bind(this);
        this._handlePartialChange = this._handlePartialChange.bind(this);
    }

    componentWillReceiveProps(props: ElementEditorProps) {
        this.setState(
            {
                editElement: props.element
            });
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        const { component, onSave, classes } = this.props;
        const { editElement } = this.state;

        if (!component) {
            return <CircularProgress size={100}/>;
        }
        return (
            <PaperWithHead
                className={classes.root}
                label={`${component.label} / Eintrag`}
                action={(
                    <div>
                        <Link to={`/collection/${component._id}/elements`}>
                            <IconButton>
                                <Icon>
                                    view_carousel
                                </Icon>
                            </IconButton>
                        </Link>
                        <Link to={`/collection/${component._id}`}>
                            <IconButton>
                                <Icon>
                                    settings
                                </Icon>
                            </IconButton>
                        </Link>
                    </div>
                )}
            >
                <Button
                    variant={'fab'}
                    color={'secondary'}
                    onClick={this._handleSave}
                >
                    <Icon>check</Icon>
                </Button>
                {editElement
                    ? (
                     <div className={classes.content}>
                         <ElementModelEditor
                             properties={component.props}
                             data={editElement.data}
                             onDataChange={partialData =>
                                 this._handlePartialChange({
                                                               data: Object.assign({},
                                                                                   editElement.data,
                                                                                   partialData)
                                                           })}
                         />
                     </div>
                 )
                    : <CircularProgress size={100}/>
                }
            </PaperWithHead>
        );
    }

    private _handlePartialChange(update: Partial<ElementModel>) {
        this.setState(
            {
                editElement: Object.assign({}, this.state.editElement, update)
            });
    }

    private _handleSave() {
        if (!this.state.editElement) {
            throw new Error(`Can't save before recieved data from server`);
        }
        this.props.onSave(this.state.editElement);
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    (props: RouteComponentProps<{ collIdent: string; elementId: string }>) => ({
        component: {
            collection: 'component' as 'component',
            id: props.match.params.collIdent
        },
        element: {
            collection: 'element' as 'element',
            id: props.match.params.elementId
        }
    })
);

const decorateStore = connect(
    null,
    (dispatch, props: RouteComponentProps<{ collIdent: string; elementId: string }>) => ({
        onSave: data => {
            dispatch(DatabasePatch(collectionKey, props.match.params.elementId, data));
        }
    }));

export default compose(withRouter,
                       decorateStore,
                       decorateDatabase,
                       decorateStyles)(ElementEditor);