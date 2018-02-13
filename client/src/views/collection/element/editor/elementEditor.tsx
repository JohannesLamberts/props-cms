import * as Immutable         from 'immutable';
import {
    CircularProgress,
    Icon,
    Paper,
    Typography,
    withStyles,
    WithStyles
}                             from 'material-ui';
import {
    CollDefinitionModel,
    CollElementModel
}                             from 'props-cms.connector-common';
import * as React             from 'react';
import { connect }            from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                             from 'react-router';
import { Link }               from 'react-router-dom';
import { compose }            from 'redux';
import { DatabaseActions }    from '../../../../redux/database.reducer';
import { StoreState }         from '../../../../redux/store';
import CollElementModelEditor from './editorContent';

const collectionKey = 'coll_element';

const styles = {
    root: {
        width: '100%'
    },
    header: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    } as React.CSSProperties,
    content: {
        padding: '1rem'
    }
};

const decorateStyles = withStyles(styles);

type DefinitionProps<TData = any> = {
    onMount: () => void;
    onDataChange: (data: Partial<CollElementModel>) => void;
    collElement: CollElementModel | undefined;
    collDefinition: CollDefinitionModel | undefined;
} & WithStyles<keyof typeof styles>;

class CollElementEditor extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { collElement, collDefinition, onDataChange, classes } = this.props;
        if (!collDefinition || !collElement) {
            return (
                <CircularProgress
                    size={100}
                />
            );
        }
        return (
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <Typography variant={'headline'}>
                        {collDefinition.label}
                    </Typography>
                    <Link to={`/collection/${collDefinition._id}`}>
                        <Icon>
                            settings
                        </Icon>
                    </Link>
                </div>
                <div className={classes.content}>
                    <CollElementModelEditor
                        collDefinition={collDefinition}
                        collElement={collElement}
                        onDataChange={onDataChange}
                    />
                </div>
            </Paper>
        );
    }
}

const decorateStore = connect(
    (store: StoreState, props: RouteComponentProps<{ collIdent: string; elementId: string }>) => {
        const { collIdent, elementId } = props.match.params;
        return {
            collDefinition:
                store.database.get('models')
                     .get('coll_definition', Immutable.Map())
                     .get(collIdent),
            collElement:
                store.database.get('models')
                     .get('coll_element', Immutable.Map())
                     .get(elementId)
        };
    },
    (dispatch, props: RouteComponentProps<{ collIdent: string; elementId: string }>) => {
        const { collIdent, elementId } = props.match.params;
        return {
            onMount: () => {
                dispatch(DatabaseActions.requireId('coll_definition', collIdent));
                dispatch(DatabaseActions.requireId('coll_element', elementId));
            },
            onDataChange: data => {
                dispatch(DatabaseActions.patch(collectionKey, elementId, data));
            }
        };
    });

export default compose(withRouter,
                       decorateStore,
                       decorateStyles)(CollElementEditor);