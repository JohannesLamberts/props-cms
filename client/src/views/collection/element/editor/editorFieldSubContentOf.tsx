import * as Immutable         from 'immutable';
import {
    CollDefinitionModel,
    CollElementModel
}                             from 'props-cms.connector-common';
import * as React             from 'react';
import { connect }            from 'react-redux';
import { DatabaseActions }    from '../../../../redux/database.reducer';
import { StoreState }         from '../../../../redux/store';
import CollElementModelEditor from './editorContent';

interface DefinitionProps {
    record: CollElementModel;
    onDataChange: (newData: CollElementModel) => void;
    collDefinitions: Immutable.Map<string, CollDefinitionModel>;
    onMount: () => void;
}

class CollElementEditorFieldSubContentOfInternal extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { record, onDataChange, collDefinitions } = this.props;

        const collDefinition = collDefinitions.get(record.collection);

        if (!record.collection) {
            return null;
        }

        if (!collDefinition) {
            return <span>Loading CollDefinition for '{record.collection}'</span>;
        }

        return (
            <CollElementModelEditor
                data={record.data}
                fields={collDefinition.fields}
                onDataChange={newData => ({
                    data: Object.assign({},
                                        record.data,
                                        newData)
                })}
            />
        );
    }
}

const decorateStore = connect(
    (store: StoreState) => {
        return {
            collDefinitions: store.database
                                  .get('models')
                                  .get('coll_definition', Immutable.Map())
        };
    },
    (dispatch) => ({
        onMount: () => {
            dispatch(DatabaseActions.require('coll_definition'));
        }
    }));

export const CollElementEditorFieldSubContentOf
                 = decorateStore(CollElementEditorFieldSubContentOfInternal);