import * as Immutable          from 'immutable';
import {
    CircularProgress,
    Icon,
    IconButton,
    Paper,
    Typography
}                              from 'material-ui';
import * as React              from 'react';
import { connect }             from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                              from 'react-router';
import { Link }                from 'react-router-dom';
import { CollDefinitionModel } from '../../../models/collectionDefinition.model';
import { CollElementModel }    from '../../../models/collectionElement.model';
import { DatabaseActions }     from '../../../redux/database.reducer';
import { StoreState }          from '../../../redux/store';
import { DbApiService }        from '../../../services/database.api_service';
import {
    FloatingActionButton,
    SimpleTable
}                              from '../../../util/index';

const collectionKey = 'coll_element';

interface DefinitionProps {
    collDefinition: CollDefinitionModel;
    collElements: CollElementModel[];
    onMount: () => void;
    onPush: () => void;
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

        return (
            <Paper style={{ width: '100%' }}>
                <FloatingActionButton
                    onClick={this.props.onPush}
                >
                    <Icon>add</Icon>
                </FloatingActionButton>
                <div
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.07)',
                        padding: '1rem'
                    }}
                >
                    <Typography variant={'headline'}>
                        {this.props.collDefinition.label}
                    </Typography>
                </div>
                <SimpleTable
                    data={this.props.collElements}
                >
                    {[
                        {
                            head: '',
                            content: (el) => (
                                <Link to={`elements/${el._id}`}>
                                    <IconButton>
                                        <Icon>settings</Icon>
                                    </IconButton>
                                </Link>
                            )
                        },
                        ...this.props.collDefinition.fields.map(field => ({
                            head: field.label,
                            content: (collElement) => JSON.stringify(collElement.data[field.key])
                        }))
                    ]}
                </SimpleTable>
            </Paper>
        );
    }
}

export default withRouter((props: RouteComponentProps<{ collectionId: string }>) => {

    const collectionId = props.match.params.collectionId;

    const Component = connect(
        (store: StoreState) => {
            return {
                collElements: store.database
                                   .get('models')
                                   .get(collectionKey, Immutable.Map())
                                   .toArray()
                                   .filter((el: CollElementModel) => {
                                       return el.collection === collectionId;
                                   }),
                collDefinition: store.database
                                     .get('models')
                                     .get('coll_definition', Immutable.Map())
                                     .get(collectionId)
            };
        },
        (dispatch) => ({
            onMount: () => {
                dispatch(DatabaseActions.require(collectionKey));
                dispatch(DatabaseActions.requireId('coll_definition', collectionId));
            },
            onPush: () => {
                DbApiService
                    .push(collectionKey, {
                        collection: collectionId,
                        data: {},
                        dataOverwrites: []
                    } as CollElementModel)
                    .then(() => dispatch(DatabaseActions
                                             .require(collectionKey)));
            }
        }))(CollElementList);

    return <Component/>;

});
