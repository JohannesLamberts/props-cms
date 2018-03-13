import {
    Avatar,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles,
    WithStyles
}                                 from 'material-ui';
import { CollDefinitionModel }    from 'props-cms.connector-common';
import * as React                 from 'react';
import { connect }                from 'react-redux';
import { Link }                   from 'react-router-dom';
import { compose }                from 'redux';
import {
    DatabaseDelete,
    DatabasePush
}                                 from '../../redux/database/database.actions';
import { withDatabaseConnect }    from '../../redux/database/database.decorate';
import { SectionWithActionInput } from '../../util';

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        '& > *': {
            flexBasis: '50%',
            flexGrow: 1
        },
        '& > *:not(:last-child)': {
            paddingRight: '1rem'
        },
        '& > *:not(:first-child)': {
            paddingLeft: '1rem'
        }
    }
};

type DefinitionProps = {
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
    onPush: (ident: string, root: boolean) => void;
    onDelete: (ident: string) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

const sections = [
    {
        label: 'Main',
        root: true
    },
    {
        label: 'Sub',
        root: false
    }
];

class Definition extends React.PureComponent<DefinitionProps, {}> {

    constructor(props: DefinitionProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { collDefinitions, onPush, onDelete, classes } = this.props;
        return (
            <div className={classes.root}>
                {sections.map((section, index) => {
                    return (
                        <SectionWithActionInput
                            key={index}
                            label={section.label}
                            inputLabel={'new component'}
                            onEnter={id => onPush(id, section.root)}
                        >
                            <List>
                                {collDefinitions
                                    .filter(collDefinition => collDefinition.root === section.root)
                                    .map(collDefinition => (
                                        <ListItem>
                                            <ListItemIcon>
                                                <Link to={`/collection/${collDefinition._id}`}>
                                                    <Icon>settings</Icon>
                                                </Link>
                                            </ListItemIcon>
                                            <ListItemIcon>
                                                <Link to={`/collection/${collDefinition._id}/elements`}>
                                                    <Icon>view_carousel</Icon>
                                                </Link>
                                            </ListItemIcon>
                                            <Avatar
                                                style={{
                                                    backgroundColor: collDefinition.color,
                                                    height: '1rem',
                                                    width: '1rem'
                                                }}
                                            />
                                            <ListItemText
                                                primary={collDefinition.label || collDefinition._id}
                                            />
                                            <ListItemIcon>
                                                <IconButton
                                                    onClick={() => onDelete(collDefinition._id!)}
                                                >
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </ListItemIcon>
                                        </ListItem>
                                    ))}
                            </List>
                        </SectionWithActionInput>
                    );
                })}
            </div>
        );
    }
}

const decorateStore = connect(
    null,
    dispatch => ({
        onDelete: (collIdent: string) => {
            dispatch(DatabaseDelete('coll_definition', collIdent));
        },
        onPush: (_id: string, root: boolean) => {
            dispatch(DatabasePush('coll_definition', {
                _id,
                root,
                label: '',
                icon: '',
                color: '',
                description: '',
                fields: []
            } as CollDefinitionModel));
        }
    }));

export default compose(withDatabaseConnect({
                                               collDefinitions: 'coll_definition'
                                           },
                                           {}),
                       decorateStore,
                       decorateStyle)(Definition);