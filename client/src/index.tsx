import MomentUtils             from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MuiThemeProvider        from 'material-ui/styles/MuiThemeProvider';
import * as moment             from 'moment';
import 'moment/locale/de';
import * as React              from 'react';
import * as ReactDOM           from 'react-dom';
import { Provider }            from 'react-redux';
import {
    Route,
    Router
}                              from 'react-router';
import { AppRoot }             from './app';
import DBWebsocketSubscription from './redux/database/database.websocket';
import {
    browserHistory,
    Store
}                              from './redux/store';
import { LightTheme }          from './styles/theme';

moment.locale('de');

ReactDOM.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <MuiThemeProvider theme={LightTheme}>
                <Route
                    render={() => (
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DBWebsocketSubscription url={process.env.REACT_APP_URL_WEBSOCKET}/>
                            <AppRoot/>
                        </MuiPickersUtilsProvider>
                    )}
                />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);