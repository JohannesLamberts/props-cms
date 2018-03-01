import MongoConnect from './database/database';
import HttpDownAPI  from './http/api.downloads';
import HttpUpAPI    from './http/api.uploads';

MongoConnect()
    .then(() => {
        HttpUpAPI();
        HttpDownAPI();
    });
