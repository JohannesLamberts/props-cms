import MongoConnect          from './database';
import HttpAPI               from './http_api';
import SubscriptionWebsocket from './websocket';

MongoConnect()
    .then(() => {
        HttpAPI();
        SubscriptionWebsocket();
    });
