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
import { DatabaseActions }      from '../../redux/database.reducer';
import {
    StoreDispatchProp,
    StoreState
}                               from '../../redux/store';
import { DbApiService }         from '../../services/database.api_service';
import { FloatingActionButton } from '../../util/index';

const collectionKey = 'coll_definition';

interface DefinitionProps {
    collDefinitions: Collections[typeof collectionKey][];
}

class Definition extends React.PureComponent<DefinitionProps & StoreDispatchProp, {}> {

    constructor(props: DefinitionProps & StoreDispatchProp) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch(DatabaseActions.require(collectionKey));
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <FloatingActionButton
                    onClick={() => DbApiService
                        .push(collectionKey)
                        .then(() => this.props
                                        .dispatch(DatabaseActions
                                                      .require(collectionKey)))}
                >
                    <Icon>add</Icon>
                </FloatingActionButton>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        width: '100%'
                    }}
                >
                    {this.props.collDefinitions.map(def => (
                        <Paper
                            style={{
                                display: 'flex',
                                flexFlow: 'column nowrap',
                                flexGrow: 1,
                                alignItems: 'center',
                                padding: '0.5rem',
                                margin: '0.5rem',
                                flexBasis: '12rem'
                            }}
                        >
                            <Link to={`/collection/elements/${def._id}`}>
                                <Icon
                                    style={{
                                        fontSize: '5rem',
                                        color: 'grey'
                                    }}
                                >
                                    {def.icon}
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
                                <Link to={`/collection/definition/${def._id}`}>
                                    <IconButton>
                                        <Icon>settings</Icon>
                                    </IconButton>
                                </Link>
                                <Link to={`/collection/elements/${def._id}`}>
                                    <Typography variant={'caption'}>
                                        {def.label}
                                    </Typography>
                                </Link>
                                <Link to={`/collection/elements/${def._id}`}>
                                    <IconButton>
                                        <Icon>view_list</Icon>
                                    </IconButton>
                                </Link>
                            </div>
                        </Paper>
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
        };
    })(Definition);