import {
    Icon,
    IconButton,
    Paper,
    Typography,
    WithStyles,
    withStyles
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
import {
    DatabaseDelete,
    DatabasePatch
}                                 from '../../../redux/database/database.actions';
import { withDatabaseConnect }    from '../../../redux/database/database.decorate';
import {
    ColorTextInput,
    SimpleTextField
}                                 from '../../../util/index';
import CollDefinitionFieldsEditor from './editorFieldList';

const styles = {
    root: {
        display: 'flex',
        flexGrow: 1
    },
    definitionEditArea: {
        marginRight: '1rem',
        padding: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    definitionEditAreaHead: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    } as React.CSSProperties,
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

        if (!collDefinition) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.definitionEditArea}>
                    <div className={classes.definitionEditAreaHead}>
                        <Typography variant={'title'}>
                            {collDefinition.label || collDefinition._id}
                        </Typography>
                        {collDefinition.root && (
                            <Link
                                style={{ float: 'right' }}
                                to={`/collection/${collDefinition._id}/elements`}
                            >
                                <IconButton>
                                    <Icon>view_carousel</Icon>
                                </IconButton>
                            </Link>
                        )}
                    </div>
                    <SimpleTextField
                        label={'Label'}
                        value={collDefinition.label}
                        onBlur={label => onDataChange({ label })}
                    />
                    <ColorTextInput
                        label={'Farbe'}
                        value={collDefinition.color}
                        onChange={color => onDataChange({ color })}
                    />
                    <SimpleTextField
                        multiline={true}
                        label={'Beschreibung'}
                        value={collDefinition.description}
                        onBlur={description => onDataChange({ description })}
                    />
                </Paper>
                <div className={classes.fieldEditArea}>
                    <CollDefinitionFieldsEditor
                        fields={collDefinition.fields || []}
                        onDataChange={fields => onDataChange({ fields })}
                    />
                </div>
            </div>
        );
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    (props: RouteComponentProps<{ collIdent: string }>) => ({
        collDefinition: {
            collection: 'coll_definition' as 'coll_definition',
            id: props.match.params.collIdent
        }
    })
);

const decorateStore = connect(
    null,
    (dispatch, props: RouteComponentProps<{ collIdent: string }>) => {
        const { collIdent } = props.match.params;
        return {
            onDataChange: data => {
                dispatch(DatabasePatch('coll_definition', collIdent, data));
            },
            onDelete: () => {
                dispatch(DatabaseDelete('coll_definition', collIdent));
            }
        };
    });

export default compose(withRouter,
                       decorateStore,
                       decorateDatabase,
                       decorateStyle)(CollDefinitionEditor);