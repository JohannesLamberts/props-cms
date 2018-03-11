import {
    WithStyles,
    withStyles
}                                 from 'material-ui';
import { CollDefinitionModel }    from 'props-cms.connector-common';
import * as React                 from 'react';
import { connect }                from 'react-redux';
import { compose }                from 'redux';
import {
    DatabaseDelete,
    DatabasePush
}                                 from '../../redux/database/database.actions';
import { withDatabaseConnect }    from '../../redux/database/database.decorate';
import { SectionWithActionInput } from '../../util';
import CollectionGridItemRoot     from './gridItemRoot';
import CollectionGridItemSub      from './griditemSub';

const styles = {
    root: {
        width: '100%'
    },
    tilesWrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        padding: '1rem 0'
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
        GridComponent: CollectionGridItemRoot,
        root: true
    },
    {
        label: 'Sub',
        GridComponent: CollectionGridItemSub,
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
                    const GridComponent = section.GridComponent;
                    return (
                        <SectionWithActionInput
                            key={index}
                            label={section.label}
                            onEnter={id => onPush(id, true)}
                        >
                            <div className={classes.tilesWrapper}>
                                {collDefinitions
                                    .filter(collDefinition => collDefinition.root === section.root)
                                    .map(collDefinition => (
                                        <GridComponent
                                            key={collDefinition._id}
                                            collDefinition={collDefinition}
                                            onDelete={() => onDelete(collDefinition._id!)}
                                        />
                                    ))}
                            </div>
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

export const CollectionGrid
                 = compose(withDatabaseConnect({
                                                   collDefinitions: 'coll_definition'
                                               },
                                               {}),
                           decorateStore,
                           decorateStyle)(Definition);