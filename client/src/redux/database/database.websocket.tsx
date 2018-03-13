import {
    CollectionKey,
    DatabaseUpdate
}                  from 'props-cms.connector-common';
import * as React  from 'react';
import { connect } from 'react-redux';
import * as SOCKET from 'socket.io-client';
import {
    DatabaseRecieveDeleteId,
    DatabaseRequireId
}                  from './database.actions';

const decorateStore = connect(
    null,
    dispatch => ({
        onNext: (data: DatabaseUpdate) => {
            switch (data.operationType) {
                case 'update':
                case 'insert':
                    dispatch(DatabaseRequireId(data.collection,
                                               data._id,
                                               true));
                    break;
                case 'delete':
                    dispatch(DatabaseRecieveDeleteId(
                        {
                            [data.collection]: [data._id]
                        } as Record<CollectionKey, string[]>
                    ));
                    break;
                default:
                    console.debug(`Not implemented: ${data.operationType}`);
                    break;
            }
        }
    }));

interface WSComponentProps {
    url?: string;
    children?: React.ReactNode;
    onNext: (data: DatabaseUpdate) => void;
}

class WSComponent extends React.Component<WSComponentProps> {

    private _ws: SocketIOClient.Socket | null = null;

    componentWillMount() {

        const { url, onNext } = this.props;

        if (url) {

            const ws = SOCKET(url);

            ws.on('db.next', onNext);

            ws.on('connect', () => {
                console.debug(`WS connected`);
                ws.emit('db.subscribe', ['component', 'element']);
            });

            ws.on('disconnect', () => {
                console.debug(`WS disconnected`);
            });

            this._ws = ws;
        }
    }

    componentWillUnmount() {
        if (this._ws) {
            this._ws.disconnect();
        }
    }

    render() {
        return this.props.children || null;
    }
}

export default decorateStore(WSComponent);