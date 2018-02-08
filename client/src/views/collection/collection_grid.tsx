import * as Immutable            from 'immutable';
import {
    Divider,
    Icon,
    Typography
}                                from 'material-ui';
import * as React                from 'react';
import { connect }               from 'react-redux';
import { Collections }           from '../../models/_collections';
import { CollDefinitionModel }   from '../../models/collectionDefinition.model';
import { DatabaseActions }       from '../../redux/database.reducer';
import { StoreState }            from '../../redux/store';
import { DbApiService }          from '../../services/database.api_service';
import { FloatingActionButton }  from '../../util/index';
import { CollectionGridItem }    from './collection_grid_item_root';
import { CollectionGridItemSub } from './collection_grid_item_sub';

const collectionKey = 'coll_definition';

interface DefinitionProps {
    collDefinitions: Collections[typeof collectionKey][];
    onMount: () => void;
    onPush: () => void;
    onCollDelete: (ident: string) => void;
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
        return (
            <div
                style={{
                    width: '100%'
                }}
            >
                <FloatingActionButton
                    onClick={this.props.onPush}
                >
                    <Icon>add</Icon>
                </FloatingActionButton>
                <Typography variant={'headline'}>
                    Main
                </Typography>
                <Divider/>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        width: '100%',
                        padding: '1rem 0'
                    }}
                >
                    {this.props
                         .collDefinitions
                         .filter(collDefinition => collDefinition.root)
                         .map(collDefinition => (
                             <CollectionGridItem
                                 collDefinition={collDefinition}
                                 onDelete={() => this.props.onCollDelete(collDefinition._id)}
                             />
                         ))}
                </div>
                <Typography variant={'headline'}>
                    Sub
                </Typography>
                <Divider/>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        width: '100%',
                        padding: '1rem 0'
                    }}
                >
                    {this.props
                         .collDefinitions
                         .filter(collDefinition => !collDefinition.root)
                         .map(collDefinition => (
                             <CollectionGridItemSub
                                 collDefinition={collDefinition}
                                 onDelete={() => this.props.onCollDelete(collDefinition._id)}
                             />
                         ))}
                </div>
            </div>
        );
    }
}

export default connect(
    (store: StoreState) => {
        return {
            collDefinitions: store.database
                                  .get('models')
                                  .get(collectionKey, Immutable.Map())
                                  .toArray()
                                  .sort((elA, elB) => elA.label.localeCompare(elB.label))
        };
    },
    dispatch => ({
        onCollDelete: (collIdent: string) => {
            DbApiService.delete('coll_definition', collIdent)
                        .then(() => {
                            dispatch(DatabaseActions.require('coll_definition'));
                        });
        },
        onMount: () => {
            dispatch(DatabaseActions.require(collectionKey));
        },
        onPush: () => {
            DbApiService
                .push(collectionKey, {
                    ident: '',
                    root: false,
                    label: '',
                    icon: '',
                    color: '',
                    description: '',
                    fields: []
                } as CollDefinitionModel)
                .then(() => {
                    dispatch(DatabaseActions.require(collectionKey));
                });
        }
    }))(Definition);