import * as Immutable                         from 'immutable';
import {
    Icon,
    MenuItem,
    TextField
}                                             from 'material-ui';
import {
    CollDefinitionFieldOptions,
    CollDefinitionModel,
    CollElementModel
}                                             from 'props-cms.connector-common';
import * as React                             from 'react';
import { connect }                            from 'react-redux';
import { DatabaseActions }                    from '../../../../redux/database.reducer';
import { StoreState }                         from '../../../../redux/store';
import { CollElementEditorFieldSubContentOf } from './editorFieldSubContentOf';

interface DefinitionProps {
    typeOptions: CollDefinitionFieldOptions['subContent'];
    record?: CollElementModel;
    onDataChange: (newData: CollElementModel) => void;
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
}

class CollElementEditorFieldSubContentInternal extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        const { onDataChange, collDefinitions, typeOptions } = this.props;

        const record = this.props.record || {
            collection: '',
            data: {},
            dataOverwrites: []
        };

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
                {typeOptions.options.length !== 1 && (
                    <TextField
                        style={{
                            flexBasis: '80px',
                            flexGrow: 0
                        }}
                        value={record && record.collection || 'NONE'}
                        label={'Collection'}
                        select={true}
                        onChange={event => {
                            onDataChange(Object.assign({},
                                                       record,
                                                       {
                                                           collection: event.target.value,
                                                           data: {},
                                                           dataOverwrites: []
                                                       }));
                        }}
                    >
                        {(collDefinitions || [])
                            .filter(definition =>
                                        typeOptions.options.length === 0
                                        || typeOptions.options.indexOf(definition._id!) !== -1)
                            .map(definition => (
                                <MenuItem
                                    key={definition._id}
                                    value={definition._id}
                                >
                                    <Icon>{definition.icon}</Icon>{' '}{definition.label || definition._id}
                                </MenuItem>
                            ))}
                    </TextField>
                )}
                <div style={{ flexGrow: 1 }}>
                    <CollElementEditorFieldSubContentOf
                        record={record}
                        onDataChange={onDataChange}
                    />
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