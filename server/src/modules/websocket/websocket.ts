import {
    createServer,
    Server as HttpServer
}                          from 'http';
import { listen }          from 'socket.io';
import { Logger }          from '../logger/logger';
import { LoggerModule }    from '../logger/logger.module';
import WebsocketConnection from './websocket_connection';

export default class {

    private _httpServer: HttpServer;
    private _io: SocketIO.Server;
    private _logger: Logger;

    private _connections: WebsocketConnection[] = [];

    constructor(private _port: number) {
    }

    init(): this {

        this._logger = LoggerModule.spawn('WebsocketModule');

        this._httpServer = createServer();
        this._httpServer.listen(this._port);

        this._io = listen(this._httpServer);

        this._logger
            .info(`Server listening on `
                + `ws://${this._httpServer.address().address}:${this._httpServer.address().port}`);

        this._io.on('connection', (socket: SocketIO.Socket) => {
            const ws = new WebsocketConnection(socket);
            ws.init();
            this._connections.push(ws);
            this._logger.debug(`+    connected ${socket.id} (${this._connections.length} connections)`);
            socket.on('disconnect', () => {
                ws.destroy();
                this._connections = this._connections
                                        .filter(wsEl => wsEl !== ws);
                this._logger.debug(`- disconnected ${socket.id} (${this._connections.length} connections)`);
            });
        });
        return this;
    }
}