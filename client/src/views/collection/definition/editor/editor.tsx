import * as Immutable                 from 'immutable';
import {
    Icon,
    Paper
}                                     from 'material-ui';
import { InputAdornment }             from 'material-ui/Input';
import * as React                     from 'react';
import { connect }                    from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                                     from 'react-router';
import { CollDefinitionModel }        from '../../../../models/collectionDefinition.model';
import { DatabaseActions }            from '../../../../redux/database.reducer';
import { StoreState }                 from '../../../../redux/store';
import { SimpleTextField }            from '../../../../util';
import { CollDefinitionFieldsEditor } from './editorFields';

const collectionKey = 'coll_definition';

type DefinitionProps<TData = any> = {
    onMount: () => void;
    onDataChange: (data: Partial<CollDefinitionModel>) => void;
    data: CollDefinitionModel;
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
        const { data, onDataChange } = this.props;
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
                        value={data.ident}
                        onBlur={ident => onDataChange({ ident })}
                    />
                    <SimpleTextField
                        label={'Label'}
                        value={data.label}
                        onBlur={label => onDataChange({ label })}
                    />
                    <SimpleTextField
                        multiline={true}
                        label={'Beschreibung'}
                        value={data.description}
                        onBlur={description => onDataChange({ description })}
                    />
                    <SimpleTextField
                        label={'Icon'}
                        value={data.icon}
                        onBlur={icon => onDataChange({ icon })}
                        TextFieldProps={{
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon>{data.icon}</Icon>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Paper>
                <div style={{ flexGrow: 1 }}>
                    <CollDefinitionFieldsEditor
                        fields={data.fields || []}
                        onDataChange={(newFields) => onDataChange({ fields: newFields })}
                    />
                </div>
            </div>
        );
    }
}

class RouteWrapped extends React.PureComponent<RouteComponentProps<{ modelId: string }>> {

    render() {
        const modelId = this.props.match.params.modelId;

        const Component = connect(
            (store: StoreState) => {
                return {
                    data: store.database.get('models')
                               .get(collectionKey, Immutable.Map())
                               .get(modelId, {})
                };
            },
            (dispatch) => ({
                onMount: () => {
                    dispatch(DatabaseActions.requireId(collectionKey, modelId));
                },
                onDataChange: data => {
                    dispatch(DatabaseActions.patch(collectionKey, modelId, data));
                }
            }))(CollDefinitionEditor);

        return <Component/>;
    }
}

export default withRouter(RouteWrapped);