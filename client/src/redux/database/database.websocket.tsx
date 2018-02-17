import { Collections }       from 'props-cms.connector-common';
import * as React            from 'react';
import { connect }           from 'react-redux';
import * as SOCKET           from 'socket.io-client';
import { DatabaseRequireId } from './database.actions';

export enum EDatabaseEventType {
    eInsert,
    eDelete,
    eUpdate
}

export interface DatabaseEvent {
    type: EDatabaseEventType;
    id: string;
    collection: keyof Collections;
}

const decorateStore = connect(
    null,
    dispatch => ({
        onNext: (data: DatabaseEvent) => {
            switch (data.type) {
                case EDatabaseEventType.eUpdate:
                case EDatabaseEventType.eInsert:
                    dispatch(DatabaseRequireId(data.collection,
                                               data.id,
                                               true));
                    break;
                default:
                    console.debug(`Not implemented: ${data.type}`);
                    break;
            }
        }
    }));

interface WSComponentProps {
    url?: string;
    children?: React.ReactNode;
    onNext: (data: DatabaseEvent) => void;
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
                ws.emit('db.subscribe', 'subscribe');
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