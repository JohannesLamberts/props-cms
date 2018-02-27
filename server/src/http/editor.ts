import * as express from 'express';
import * as path    from 'path';
import { ENV }      from '../env';
import { Server }   from '../environment';

const { editor } = ENV.webserver;

export default () => {
    if (editor) {
        Server
            .createExpress(
                {
                    port: editor.port,
                    init: app => {

                        app.use((req, res, next) => {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
                            res.setHeader('Access-Control-Allow-Headers',
                                          'Origin, X-Requested-With, Content-Type, Accept');
                            next();
                        });

                        const AppFrontend = (req, res) => {
                            res.sendFile(path.join(process.cwd(), editor.src!, 'index.html'));
                        };
                        app.use('/static', express.static(path.join(editor.src!, 'static')));
                        app.get('/', AppFrontend);
                        app.get('/*', AppFrontend);
                    }
                });
    }
};