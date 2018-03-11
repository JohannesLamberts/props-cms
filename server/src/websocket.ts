import {
    ChangeStream,
    Db
}                                         from 'mongodb';
import { websocketConnectorMongoDbWatch } from 'server-modules';
import { getCollection }                  from './database';
import { ENV }                            from './env';
import { Server }                         from './environment';

const { websocket } = ENV;

export default () => {
    if (websocket) {
        Server
            .createWebsocket(
                {
                    port: websocket.port,
                    connection: websocketConnectorMongoDbWatch({ getCollection })
                });
    }
};