import MongoConnect from './database/database';
import HttpUpAPI    from './http/api.downloads';
import HttpDownAPI  from './http/api.uploads';

MongoConnect()
    .then(() => {
        HttpUpAPI();
        HttpDownAPI();
    });
