import {
    CircularProgress,
    Icon,
    Paper,
    Typography,
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
import ElementModelEditor      from './editorContent';

const collectionKey = 'element';

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
    onDataChange: (data: Partial<ElementModel>) => void;
    collElement: ElementModel | undefined;
    collDefinition: ComponentModel | undefined;
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
                    <ElementModelEditor
                        properties={collDefinition.props}
                        data={collElement.data}
                        onDataChange={partialData =>
                            onDataChange({
                                             data: Object.assign({},
                                                                 collElement.data,
                                                                 partialData)
                                         })}
                    />
                </div>
            </Paper>
        );
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    (props: RouteComponentProps<{ collIdent: string; elementId: string }>) => ({
        collDefinition: {
            collection: 'component' as 'component',
            id: props.match.params.collIdent
        },
        collElement: {
            collection: 'element' as 'element',
            id: props.match.params.elementId
        }
    })
);

const decorateStore = connect(
    null,
    (dispatch, props: RouteComponentProps<{ collIdent: string; elementId: string }>) => ({
        onDataChange: data => {
            dispatch(DatabasePatch(collectionKey, props.match.params.elementId, data));
        }
    }));

export default compose(withRouter,
                       decorateStore,
                       decorateDatabase,
                       decorateStyles)(CollElementEditor);