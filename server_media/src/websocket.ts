import { websocketConnectorMongoDbWatch } from 'server-modules';
import { getCollection }                  from './database';
import { MEDIA_ENV }                      from './env';
import { MediaServer }                    from './environment';

const { port_subscriptions } = MEDIA_ENV;

export default () => {
    if (port_subscriptions) {
        MediaServer
            .createWebsocket(
                {
                    port: port_subscriptions,
                    connection: websocketConnectorMongoDbWatch({ getCollection })
                });
    }
};