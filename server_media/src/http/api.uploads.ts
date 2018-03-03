import { UploadAPI }   from '../api/api.uploads';
import { MEDIA_ENV }   from '../env';
import { MediaServer } from '../environment';

export default () => {
    MediaServer
        .createExpress(
            {
                port: MEDIA_ENV.port_up,
                init: app => {

                    app.use((req, res, next) => {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
                        res.setHeader('Access-Control-Allow-Headers',
                                      'Origin, X-Requested-With, Content-Type, Accept');
                        next();
                    });

                    // TODO: authenticate
                    UploadAPI.registerOn(MediaServer.logger, app);
                }
            });
};