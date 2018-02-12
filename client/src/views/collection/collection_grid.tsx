import * as Immutable            from 'immutable';
import { CollDefinitionModel }   from 'props-cms.connector-common';
import * as React                from 'react';
import { connect }               from 'react-redux';
import { DatabaseActions }       from '../../redux/database.reducer';
import { StoreState }            from '../../redux/store';
import { DatabaseApiService }    from '../../services/database.api_service';
import { CollectionGridItem }    from './collection_grid_item_root';
import { CollectionGridItemSub } from './collection_grid_item_sub';
import { CollectionGridSection } from './collection_grid_section';

interface DefinitionProps {
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
    onPush: (ident: string, root: boolean) => void;
    onDelete: (ident: string) => void;
}

class Definition extends React.PureComponent<DefinitionProps, {}> {

    constructor(props: DefinitionProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { collDefinitions, onPush, onDelete } = this.props;
        return (
            <div
                style={{
                    width: '100%'
                }}
            >
                <CollectionGridSection
                    label={'Main'}
                    models={collDefinitions
                        .filter(collDefinition => collDefinition.root)}
                    onPush={id => this.props.onPush(id, true)}
                    onDelete={id => this.props.onDelete(id)}
                    tile={CollectionGridItem}
                />
                <CollectionGridSection
                    label={'Sub'}
                    models={collDefinitions
                        .filter(collDefinition => !collDefinition.root)}
                    onPush={id => this.props.onPush(id, false)}
                    onDelete={id => this.props.onDelete(id)}
                    tile={CollectionGridItemSub}
                />
            </div>
        );
    }
}

export const CollectionGrid = connect(
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
    }))(Definition);