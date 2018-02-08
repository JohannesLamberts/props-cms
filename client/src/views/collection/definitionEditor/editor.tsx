import * as Immutable                 from 'immutable';
import {
    Button,
    FormControlLabel,
    Icon,
    Paper,
    Switch
}                                     from 'material-ui';
import * as React                     from 'react';
import { connect }                    from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                                     from 'react-router';
import { Link }                       from 'react-router-dom';
import { CollDefinitionModel }        from '../../../models/collectionDefinition.model';
import { DatabaseActions }            from '../../../redux/database.reducer';
import { StoreState }                 from '../../../redux/store';
import { DbApiService }               from '../../../services/database.api_service';
import { IconSelect }                 from '../../../util/components/iconSelect';
import { SimpleTextField }            from '../../../util/index';
import { CollDefinitionFieldsEditor } from './editorFields';

const collectionKey = 'coll_definition';

type DefinitionProps<TData = any> = {
    onMount: () => void;
    onDelete: () => void;
    onDataChange: (data: Partial<CollDefinitionModel>) => void;
    collDefinition: CollDefinitionModel;
};

class CollDefinitionEditor extends React.PureComponent<DefinitionProps, {}> {

    constructor(props: DefinitionProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { collDefinition, onDataChange, onDelete } = this.props;
        return (
            <div
                style={{
                    display: 'flex',
                    padding: '0.5rem'
                }}
            >
                <Paper
                    style={{
                        margin: '0.5rem',
                        padding: '0.5rem',
                        display: 'flex',
                        flexFlow: 'column nowrap'
                    }}
                >
                    <SimpleTextField
                        label={'Ident'}
                        value={collDefinition.ident}
                        onBlur={ident => onDataChange({ ident })}
                    />
                    <SimpleTextField
                        label={'Label'}
                        value={collDefinition.label}
                        onBlur={label => onDataChange({ label })}
                    />
                    <SimpleTextField
                        multiline={true}
                        label={'Beschreibung'}
                        value={collDefinition.description}
                        onBlur={description => onDataChange({ description })}
                    />
                    <IconSelect
                        icon={collDefinition.icon}
                        onIconChange={icon => onDataChange({ icon })}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={collDefinition.root}
                                onChange={(event, root) => onDataChange({ root })}
                            />
                        }
                        label={'Main'}
                    />
                    {collDefinition.root && (
                        <Link to={`/collection/${collDefinition._id}/elements`}>
                            <Button>
                                <Icon>launch</Icon>
                                Einträge
                            </Button>
                        </Link>
                    )}
                    <Button onClick={onDelete}>
                        <Icon>delete</Icon>
                        Löschen
                    </Button>
                </Paper>
                <div style={{ flexGrow: 1 }}>
                    <CollDefinitionFieldsEditor
                        fields={collDefinition.fields || []}
                        onDataChange={(newFields) => onDataChange({ fields: newFields })}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter((props: RouteComponentProps<{ collectionId: string }>) => {

    const collectionId = props.match.params.collectionId;

    const Component = connect(
        (store: StoreState) => {
            return {
                collDefinition:
                    store.database.get('models')
                         .get(collectionKey, Immutable.Map())
                         .get(collectionId, {})
            };
        },
        (dispatch) => ({
            onMount: () => {
                dispatch(DatabaseActions.requireId(collectionKey, collectionId));
            },
            onDataChange: data => {
                dispatch(DatabaseActions.patch(collectionKey, collectionId, data));
            },
            onDelete: () => {
                DbApiService.delete('coll_definition', collectionId);
            }
        }))(CollDefinitionEditor);

    return <Component/>;

});