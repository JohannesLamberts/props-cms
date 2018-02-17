import { createServer } from 'http';
import Websocket        from './websocket';

export const createWebsocket = (port: number) => {
    const socket = new Websocket(port);
    socket.init();
    return socket;
};