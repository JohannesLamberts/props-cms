import * as Immutable             from 'immutable';
import {
    Button,
    FormControlLabel,
    Icon,
    Paper,
    Switch,
    Typography,
    withStyles,
    WithStyles
}                                 from 'material-ui';
import { CollDefinitionModel }    from 'props-cms.connector-common';
import * as React                 from 'react';
import { connect }                from 'react-redux';
import {
    RouteComponentProps,
    withRouter
}                                 from 'react-router';
import { Link }                   from 'react-router-dom';
import { compose }                from 'redux';
import { DatabaseActions }        from '../../../redux/database.reducer';
import { StoreState }             from '../../../redux/store';
import { DatabaseApiService }     from '../../../services/database.api_service';
import IconSelect                 from '../../../util/components/iconSelect';
import { SimpleTextField }        from '../../../util/index';
import CollDefinitionFieldsEditor from './editorFieldList';

const collectionKey = 'coll_definition';

const styles = {
    root: {
        display: 'flex'
    },
    definitionEditArea: {
        margin: '0.5rem',
        padding: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    fieldEditArea: {
        flexGrow: 1
    }
};

type DefinitionProps<TData = any> = {
    onMount: () => void;
    onDelete: () => void;
    onDataChange: (data: Partial<CollDefinitionModel>) => void;
    collDefinition: CollDefinitionModel;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class CollDefinitionEditor extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { collDefinition, onDataChange, onDelete, classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.definitionEditArea}>
                    <Typography variant={'title'}>
                        {collDefinition._id}
                    </Typography>
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
                            <Button fullWidth={true}>
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
                <div className={classes.fieldEditArea}>
                    <CollDefinitionFieldsEditor
                        fields={collDefinition.fields || []}
                        onDataChange={(newFields) => onDataChange({ fields: newFields })}
                    />
                </div>
            </div>
        );
    }
}

const decorateStore = connect(
    (store: StoreState, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            collDefinition:
                store.database.get('models')
                     .get(collectionKey, Immutable.Map())
                     .get(collIdent, {})
        };
    },
    (dispatch, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            onMount: () => {
                dispatch(DatabaseActions.requireId(collectionKey, collIdent));
            },
            onDataChange: data => {
                dispatch(DatabaseActions.patch(collectionKey, collIdent, data));
            },
            onDelete: () => {
                DatabaseApiService.delete('coll_definition', collIdent);
            }
        };
    });

export default compose(withRouter,
                       decorateStore,
                       decorateStyle)(CollDefinitionEditor);