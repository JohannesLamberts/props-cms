import * as Immutable             from 'immutable';
import {
    CircularProgress,
    Icon,
    Paper,
    Typography
}                                 from 'material-ui';
import * as React                 from 'react';
import { connect }                from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                                 from 'react-router';
import { Link }                   from 'react-router-dom';
import { CollDefinitionModel }    from '../../../../models/collectionDefinition.model';
import { CollElementModel }       from '../../../../models/collectionElement.model';
import { DatabaseActions }        from '../../../../redux/database.reducer';
import { StoreState }             from '../../../../redux/store';
import { CollElementModelEditor } from './editorElement';

const collectionKey = 'coll_element';

type DefinitionProps<TData = any> = {
    onMount: () => void;
    onDataChange: (data: Partial<CollElementModel>) => void;
    collElement: CollElementModel | undefined;
    collDefinition: CollDefinitionModel | undefined;
};

class CollElementEditor extends React.PureComponent<DefinitionProps, {}> {

    constructor(props: DefinitionProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { collElement, collDefinition, onDataChange } = this.props;
        if (!collDefinition || !collElement) {
            return (
                <CircularProgress
                    size={100}
                />
            );
        }
        return (
            <Paper style={{ width: '100%' }}>
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
                <CollElementModelEditor
                    collDefinition={collDefinition}
                    collElement={collElement}
                    onDataChange={onDataChange}
                />
            </Paper>
        );
    }
}

export default withRouter((props: RouteComponentProps<{
    collectionId: string;
    elementId: string;
}>) => {

    const { collectionId, elementId } = props.match.params;

    const Component = connect(
        (store: StoreState) => {
            return {
                collDefinition:
                    store.database.get('models')
                         .get('coll_definition', Immutable.Map())
                         .get(collectionId),
                collElement:
                    store.database.get('models')
                         .get('coll_element', Immutable.Map())
                         .get(elementId)
            };
        },
        (dispatch) => ({
            onMount: () => {
                dispatch(DatabaseActions.requireId('coll_definition', collectionId));
                dispatch(DatabaseActions.requireId('coll_element', elementId));
            },
            onDataChange: data => {
                dispatch(DatabaseActions.patch(collectionKey, elementId, data));
            }
        }))(CollElementEditor);

    return <Component/>;

});