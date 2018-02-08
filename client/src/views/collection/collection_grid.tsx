import * as Immutable from 'immutable';
import {
    Icon,
    IconButton,
    Paper,
    Typography
}                     from 'material-ui';
import * as React     from 'react';
import { connect }    from 'react-redux';

import { Link }                 from 'react-router-dom';
import { Collections }          from '../../models/_collections';
import { CollDefinitionModel }  from '../../models/collectionDefinition.model';
import { DatabaseActions }      from '../../redux/database.reducer';
import { StoreState }           from '../../redux/store';
import { DbApiService }         from '../../services/database.api_service';
import { FloatingActionButton } from '../../util/index';

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
                    display: 'flex',
                    flexFlow: 'row wrap',
                    width: '100%'
                }}
            >
                <FloatingActionButton
                    onClick={this.props.onPush}
                >
                    <Icon>add</Icon>
                </FloatingActionButton>
                {this.props.collDefinitions.map(def => (
                    <Paper
                        style={{
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            alignItems: 'center',
                            padding: '0.5rem',
                            margin: '0.5rem',
                            flexBasis: '12rem'
                        }}
                    >
                        <Link to={`/collection/${def._id}/elements`}>
                            <Icon
                                style={{
                                    fontSize: '4rem',
                                    margin: '0.5rem',
                                    color: 'grey'
                                }}
                            >
                                {def.icon || 'more_horiz'}
                            </Icon>
                        </Link>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Link to={`/collection/${def._id}`}>
                                <IconButton>
                                    <Icon>settings</Icon>
                                </IconButton>
                            </Link>
                            <Link to={`/collection/${def._id}/elements`}>
                                <Typography variant={'caption'}>
                                    {def.label}
                                </Typography>
                            </Link>
                            <IconButton
                                onClick={() => {
                                    this.props.onCollDelete(def._id);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </div>
                    </Paper>
                ))}
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