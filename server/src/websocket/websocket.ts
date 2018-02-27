import { ENV }                             from '../env';
import { Server }                          from '../environment';
import { WebsocketSubscriptionConnection } from './connection';

const { websocket } = ENV;

export default () => {
    if (websocket) {
        Server
            .createWebsocket(
                {
                    port: websocket.port,
                    connection: WebsocketSubscriptionConnection
                });
    }
};