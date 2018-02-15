import * as Immutable          from 'immutable';
import {
    Icon,
    MenuItem,
    TextField
}                              from 'material-ui';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';
import { connect }             from 'react-redux';
import { DatabaseActions }     from '../../redux/database.reducer';
import { StoreState }          from '../../redux/store';

interface DefinitionProps {
    className?: string;
    label: string;
    filter?: (model: CollDefinitionModel) => boolean;
    value?: string;
    onChange: (newModel: string) => void;
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
}

class CollElementEditorFieldSubContent extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        const { onChange, value, collDefinitions, filter, className, label } = this.props;

        let options = collDefinitions;

        if (filter) {
            options = options.filter(filter);
        }

        return (
            <TextField
                fullWidth={true}
                className={className}
                value={value || '%NONE%'}
                label={label}
                select={true}
                onChange={event => onChange(event.target.value)}
            >
                {options
                    .map(definition => (
                        <MenuItem
                            key={definition._id}
                            value={definition._id}
                        >
                            <Icon>{definition.icon}</Icon>{' '}{definition.label || definition._id}
                        </MenuItem>
                    ))}
            </TextField>
        );
    }
}

const decorateStore = connect(
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
    }));

export default decorateStore(CollElementEditorFieldSubContent);