import { MongoDbDatabaseWrapper } from 'server-modules/build/modules/mongodb/database';
import { ENV }                    from './env';
import { Server }                 from './environment';

const { name, auth } = ENV.db;

const Client = Server.createMongoDb({ auth });

const DbConfig = {
    collections: {
        coll_definition: {
            // watch: true
        },
        coll_element: {
            // watch: true
        }
    }
};

export let Database: MongoDbDatabaseWrapper<typeof DbConfig>;

Client.connect()
      .then(() => {
          Database = Client.database(
              name,
              DbConfig
          );

          import('./http/api');
          import('./http/editor');
          import('./websocket/websocket');
      });
