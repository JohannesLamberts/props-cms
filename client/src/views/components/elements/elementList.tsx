import {
    CircularProgress,
    Icon,
    IconButton,
    Table,
    WithStyles,
    withStyles
}                             from 'material-ui';
import {
    ComponentModel,
    ElementModel
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
    DatabaseDelete,
    DatabasePush,
    DatabaseRequire,
    DatabaseRequireId
}                             from '../../../redux/database/database.actions';
import { StoreState }         from '../../../redux/store';
import {
    FloatingActionButton,
    PaperWithHead,
    SimpleTableBody,
    SimpleTableHeader
}                             from '../../../util';

const styles = {
    root: {
        width: '100%'
    },
    table: {
        '& td:last-child': {
            textAlign: 'center',
            width: '150px'
        },
        '& th:last-child': {
            textAlign: 'center'
        }
    }
};

type DefinitionProps = {
    component: ComponentModel;
    elements: ElementModel[];
    onMount: () => void;
    onPush: (model: ElementModel) => void;
    onDrop: (id: string) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyles = withStyles(styles);

class ElementList extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        if (!this.props.component) {
            return (
                <CircularProgress
                    size={100}
                />
            );
        }

        const { component, elements, classes, onDrop, onPush } = this.props;

        return (
            <PaperWithHead
                className={classes.root}
                label={component.label}
                action={(
                    <Link to={`/collection/${component._id}`}>
                        <IconButton>
                            <Icon>
                                settings
                            </Icon>
                        </IconButton>
                    </Link>
                )}
            >
                <FloatingActionButton
                    onClick={() => onPush(
                        {
                            collection: component._id!,
                            data: InitialElementData(component),
                            dataOverwrites: []
                        })}
                >
                    <Icon>add</Icon>
                </FloatingActionButton>
                <Table className={classes.table}>
                    <SimpleTableHeader>
                        {[
                            ...component.props.map(field => field.label),
                            'Actions'
                        ]}
                    </SimpleTableHeader>
                    <SimpleTableBody
                        data={elements}
                    >
                        {(el) => [
                            ...component
                                .props
                                .map(field => JSON.stringify(el.data[field.key])),
                            (
                                <div>
                                    <Link to={`elements/${el._id}`}>
                                        <IconButton>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={() => onDrop(el._id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        ]}
                    </SimpleTableBody>
                </Table>
            </PaperWithHead>
        );
    }
}

export const decorateStore = connect(
    (store: StoreState, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            elements: (store.database
                            .get('collections')
                            .get('element')
                            .get('models')
                            .toArray() as ElementModel[])
                .filter((el: ElementModel) => {
                    return el.collection === collIdent;
                }),
            component: store.database
                            .get('collections')
                            .get('component')
                            .get('models')
                            .get(collIdent)
        };
    },
    (dispatch, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            onMount: () => {
                dispatch(DatabaseRequire('element'));
                dispatch(DatabaseRequireId('component', collIdent));
            },
            onPush: (model: ElementModel) => {
                dispatch(DatabasePush('element', model));
            },
            onDrop: (id: string) => {
                dispatch(DatabaseDelete('element', id));
            }
        };
    });

export default compose(withRouter,
                       decorateStore,
                       decorateStyles)(ElementList);