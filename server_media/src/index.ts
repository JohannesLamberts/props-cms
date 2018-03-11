import MongoConnect          from './database';
import HttpServeAPI          from './http_modify.api';
import HttpModifyAPI         from './http_serve.api';
import SubscriptionWebsocket from './websocket';

MongoConnect()
    .then(() => {
        HttpModifyAPI();
        HttpServeAPI();
        SubscriptionWebsocket();
    });
