import MongoConnect from './database';
import HttpDownAPI  from './http_modify.api';
import HttpUpAPI    from './http_serve.api';

MongoConnect()
    .then(() => {
        HttpUpAPI();
        HttpDownAPI();
    });
