import { ENV }          from './env';
import HttpServerApi    from './httpServer.api';
import HttpServerEditor from './httpServer.editor';

const { api, editor } = ENV.webserver;

if (api) {
    HttpServerApi(api);
}

if (editor) {
    HttpServerEditor(editor);
}