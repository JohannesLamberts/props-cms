import * as Immutable                         from 'immutable';
import {
    Icon,
    MenuItem,
    TextField,
    WithStyles,
    withStyles
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

const styles = {
    root: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        borderRadius: '2px',
        flexGrow: 1,
        padding: '1rem',
        display: 'flex',
        '& > *': {
            flexGrow: 1
        }
    },
    typeSelect: {
        flexBasis: '80px',
        flexGrow: 0
    }
};

type DefinitionProps = {
    typeOptions: CollDefinitionFieldOptions['subContent'];
    record?: CollElementModel;
    onDataChange: (newData: CollElementModel) => void;
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class CollElementEditorFieldSubContent extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        const { onDataChange, collDefinitions, typeOptions, classes } = this.props;

        const record = this.props.record || {
            collection: '',
            data: {},
            dataOverwrites: []
        };

        return (
            <div className={classes.root}>
                {/* Select subContentType */}
                {typeOptions.options.length !== 1 && (
                    <TextField
                        className={classes.typeSelect}
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
                <CollElementEditorFieldSubContentOf
                    record={record}
                    onDataChange={onDataChange}
                />
            </div>
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

export default decorateStore(decorateStyle(CollElementEditorFieldSubContent));