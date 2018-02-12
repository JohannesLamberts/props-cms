import * as Immutable         from 'immutable';
import {
    CircularProgress,
    Icon,
    IconButton,
    Paper,
    Typography
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
import { InitialElementData } from '../../../initializers/collectionElementDataRecordInitial';
import { DatabaseActions }    from '../../../redux/database.reducer';
import { StoreState }         from '../../../redux/store';
import { DatabaseApiService } from '../../../services/database.api_service';
import {
    FloatingActionButton,
    SimpleTable
}                             from '../../../util/index';

interface DefinitionProps {
    collDefinition: CollDefinitionModel;
    collElements: CollElementModel[];
    onMount: () => void;
    onPush: (model: CollElementModel) => void;
}

class CollElementList extends React.PureComponent<DefinitionProps, {}> {

    constructor(props: DefinitionProps) {
        super(props);
        this.state = {};
    }

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

        const { collDefinition, collElements } = this.props;

        return (
            <Paper style={{ width: '100%' }}>
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
                <div
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.07)',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant={'headline'}>
                        {collDefinition.label}
                    </Typography>
                    <Link to={`/collection/${collDefinition._id}`}>
                        <Icon>
                            settings
                        </Icon>
                    </Link>
                </div>
                <SimpleTable
                    data={collElements}
                >
                    {[
                        {
                            head: '',
                            content: (el) => (
                                <Link to={`elements/${el._id}`}>
                                    <IconButton>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </Link>
                            )
                        },
                        ...collDefinition.fields.map(field => ({
                            head: field.label,
                            content: (collElement) => JSON.stringify(collElement.data[field.key])
                        }))
                    ]}
                </SimpleTable>
            </Paper>
        );
    }
}

export const CollectionElementList = withRouter((props: RouteComponentProps<{ collIdent: string }>) => {

    const { collIdent } = props.match.params;

    const Component = connect(
        (store: StoreState) => {
            return {
                collElements: store.database
                                   .get('models')
                                   .get('coll_element', Immutable.Map())
                                   .toArray()
                                   .filter((el: CollElementModel) => {
                                       return el.collection === collIdent;
                                   }),
                collDefinition: store.database
                                     .get('models')
                                     .get('coll_definition', Immutable.Map())
                                     .get(collIdent)
            };
        },
        (dispatch) => ({
            onMount: () => {
                dispatch(DatabaseActions.require('coll_element'));
                dispatch(DatabaseActions.requireId('coll_definition', collIdent));
            },
            onPush: (model: CollElementModel) => {
                DatabaseApiService
                    .push('coll_element', model)
                    .then(() => dispatch(DatabaseActions
                                             .require('coll_element')));
            }
        }))(CollElementList);

    return <Component/>;

});
