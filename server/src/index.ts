import { ENV }          from './env';
import HttpServerApi    from './httpServers/api';
import HttpServerEditor from './httpServers/editor';

const { api, editor } = ENV.webserver;

if (api) {
    HttpServerApi(api);
}

if (editor) {
    HttpServerEditor(editor);
}