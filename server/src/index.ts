import { ENV } from './env';

const { webserver } = ENV;

if (webserver.editorAPI) {
    import('./httpServers/expressEditorAPI');
}
if (webserver.editorStatic) {
    import('./httpServers/expressEditorStatic');
}
if (webserver.servingAPI) {
    import('./httpServers/expressServingAPI');
}