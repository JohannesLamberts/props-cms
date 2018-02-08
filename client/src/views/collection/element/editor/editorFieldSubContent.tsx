import * as Immutable             from 'immutable';
import {
    Icon,
    MenuItem,
    TextField
}                                 from 'material-ui';
import * as React                 from 'react';
import { connect }                from 'react-redux';
import { CollDefinitionModel }    from '../../../../models/collectionDefinition.model';
import { CollElementModel }       from '../../../../models/collectionElement.model';
import { DatabaseActions }        from '../../../../redux/database.reducer';
import { StoreState }             from '../../../../redux/store';
import { CollElementModelEditor } from './editorElement';

interface DefinitionProps {
    data: CollElementModel;
    onDataChange: (newData: CollElementModel) => void;
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
}

class CollElementEditorFieldSubContentInternal extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { data, onDataChange, collDefinitions } = this.props;

        if (!collDefinitions) {
            return null;
        }

        const selectedDefinition = collDefinitions.filter(def => def._id === data.collection)[0];

        return (
            <div
                style={{
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    flexGrow: 1,
                    padding: '0.5rem',
                    margin: '0.5rem',
                    display: 'flex'
                }}
            >
                <TextField
                    style={{
                        flexBasis: '80px',
                        flexGrow: 0
                    }}
                    value={data.collection || 'NONE'}
                    label={'Collection'}
                    select={true}
                    onChange={event => {
                        onDataChange(Object.assign({},
                                                   data,
                                                   {
                                                       collection: event.target.value,
                                                       data: {},
                                                       dataOverwrites: []
                                                   }));
                    }}
                >
                    {(collDefinitions || []).map(definition => (
                        <MenuItem
                            key={definition._id}
                            value={definition._id}
                        >
                            <Icon>{definition.icon}</Icon>{' '}{definition.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{ flexGrow: 1 }}>
                    {selectedDefinition
                        ? (
                            <CollElementModelEditor
                                collElement={data}
                                collDefinition={collDefinitions.filter(def => def._id === data.collection)[0]}
                                onDataChange={newData => onDataChange(Object.assign({}, data, newData))}
                            />
                        )
                        : <span>Loading CollDefinition</span>
                    }
                </div>
            </div>
        );
    }
}

export const CollElementEditorFieldSubContent = connect(
    (store: StoreState) => {
        return {
            collDefinitions: store.database
                                  .get('models')
                                  .get('coll_definition', Immutable.Map())
                                  .toArray()
        };
    },
    (dispatch) => ({
        onMount: () => {
            dispatch(DatabaseActions.require('coll_definition'));
        }
    }))(CollElementEditorFieldSubContentInternal);