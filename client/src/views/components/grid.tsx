import {
    WithStyles,
    withStyles
}                              from 'material-ui';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';
import { connect }             from 'react-redux';
import { compose }             from 'redux';
import {
    DatabaseDelete,
    DatabasePush
}                              from '../../redux/database/database.actions';
import { withDatabaseConnect } from '../../redux/database/database.decorate';
import CollectionGridItemRoot  from './gridItemRoot';
import CollectionGridItemSub   from './griditemSub';
import CollectionGridSection   from './gridSection';

const styles = {
    root: {
        width: '100%'
    }
};

type DefinitionProps = {
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
    onPush: (ident: string, root: boolean) => void;
    onDelete: (ident: string) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

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
                <CollectionGridSection
                    label={'Main'}
                    models={collDefinitions
                        .filter(collDefinition => collDefinition.root)}
                    onPush={id => onPush(id, true)}
                    onDelete={id => onDelete(id)}
                    tile={CollectionGridItemRoot}
                />
                <CollectionGridSection
                    label={'Sub'}
                    models={collDefinitions
                        .filter(collDefinition => !collDefinition.root)}
                    onPush={id => onPush(id, false)}
                    onDelete={id => onDelete(id)}
                    tile={CollectionGridItemSub}
                />
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