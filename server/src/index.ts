import MongoConnect from './database';
import HttpAPI      from './http_api';
import HttpEditor   from './http_editor';
import Websocket    from './websocket';

MongoConnect()
    .then(() => {
        HttpAPI();
        HttpEditor();
        Websocket();
    });
