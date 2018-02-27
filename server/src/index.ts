import MongoConnect from './database/database';
import HttpAPI      from './http/api';
import HttpEditor   from './http/editor';
import Websocket    from './websocket/websocket';

MongoConnect()
    .then(() => {
        HttpAPI();
        HttpEditor();
        Websocket();
    });
