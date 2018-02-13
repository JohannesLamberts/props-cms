import * as Immutable          from 'immutable';
import {
    WithStyles,
    withStyles
}                              from 'material-ui';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';
import { connect }             from 'react-redux';
import { compose }             from 'redux';
import { DatabaseActions }     from '../../../redux/database.reducer';
import { StoreState }          from '../../../redux/store';
import { DatabaseApiService }  from '../../../services/database.api_service';
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
    (store: StoreState) => {
        return {
            collDefinitions: store.database
                                  .get('models')
                                  .get('coll_definition', Immutable.Map())
                                  .toArray()
                                  .sort((elA, elB) => elA.label.localeCompare(elB.label))
        };
    },
    dispatch => ({
        onDelete: (collIdent: string) => {
            DatabaseApiService.delete('coll_definition', collIdent)
                              .then(() => {
                                  dispatch(DatabaseActions.require('coll_definition'));
                              });
        },
        onMount: () => {
            dispatch(DatabaseActions.require('coll_definition'));
        },
        onPush: (_id: string, root: boolean) => {
            DatabaseApiService
                .push('coll_definition', {
                    _id,
                    root,
                    label: '',
                    icon: '',
                    color: '',
                    description: '',
                    fields: []
                } as CollDefinitionModel)
                .then(() => {
                    dispatch(DatabaseActions.require('coll_definition'));
                });
        }
    }));

export const CollectionGrid
                 = compose(decorateStore,
                           decorateStyle)(Definition);