import {
    CircularProgress,
    Icon,
    IconButton,
    Paper,
    Table,
    Typography,
    WithStyles,
    withStyles
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
import { InitialElementData } from '../../../initializers/collectionElementDataRecordInitial';
import {
    DatabasePush,
    DatabaseRequire,
    DatabaseRequireId
}                             from '../../../redux/database/database.actions';
import { StoreState }         from '../../../redux/store';
import {
    FloatingActionButton,
    SimpleTableBody,
    SimpleTableHeader
}                             from '../../../util';

const styles = {
    root: {
        width: '100%'
    },
    wrapper: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    } as React.CSSProperties
};

type DefinitionProps = {
    collDefinition: CollDefinitionModel;
    collElements: CollElementModel[];
    onMount: () => void;
    onPush: (model: CollElementModel) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyles = withStyles(styles);

class CollElementList extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        if (!this.props.collDefinition) {
            return (
                <CircularProgress
                    size={100}
                />
            );
        }

        const { collDefinition, collElements, classes } = this.props;

        return (
            <Paper className={classes.root}>
                <FloatingActionButton
                    onClick={() => this.props.onPush(
                        {
                            collection: collDefinition._id!,
                            data: InitialElementData(collDefinition),
                            dataOverwrites: []
                        })}
                >
                    <Icon>add</Icon>
                </FloatingActionButton>
                <div className={classes.wrapper}>
                    <Typography variant={'headline'}>
                        {collDefinition.label}
                    </Typography>
                    <Link to={`/collection/${collDefinition._id}`}>
                        <Icon>
                            settings
                        </Icon>
                    </Link>
                </div>
                <Table>
                    <SimpleTableHeader>
                        {['', ...collDefinition.fields.map(field => field.label)]}
                    </SimpleTableHeader>
                    <SimpleTableBody
                        data={collElements}
                    >
                        {(el) => [
                            (
                                <Link to={`elements/${el._id}`}>
                                    <IconButton>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </Link>
                            ),
                            ...collDefinition
                                .fields
                                .map(field => JSON.stringify(el.data[field.key]))
                        ]}
                    </SimpleTableBody>
                </Table>
            </Paper>
        );
    }
}

export const decorateStore = connect(
    (store: StoreState, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            collElements: (store.database
                                .get('collections')
                                .get('coll_element')
                                .get('models')
                                .toArray() as CollElementModel[])
                .filter((el: CollElementModel) => {
                    return el.collection === collIdent;
                }),
            collDefinition: store.database
                                 .get('collections')
                                 .get('coll_definition')
                                 .get('models')
                                 .get(collIdent)
        };
    },
    (dispatch, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            onMount: () => {
                dispatch(DatabaseRequire('coll_element'));
                dispatch(DatabaseRequireId('coll_definition', collIdent));
            },
            onPush: (model: CollElementModel) => {
                dispatch(DatabasePush('coll_element', model));
            }
        };
    });

export default compose(withRouter,
                       decorateStore,
                       decorateStyles)(CollElementList);