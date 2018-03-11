import { DownloadAPI } from './api/download.api';
import { UploadAPI }   from './api/upload.api';
import { MEDIA_ENV }   from './env';
import { MediaServer } from './environment';

export default () => {
    MediaServer
        .createExpress(
            {
                port: MEDIA_ENV.port_api,
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
                    DownloadAPI.registerOn(MediaServer.logger, app);
                }
            });
};