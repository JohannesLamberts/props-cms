// Get Plugins
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import { Provider }     from 'react-redux';
import { Router }       from 'react-router';
import { AppRoot }      from './app';
import {
    browserHistory,
    Store
}                       from './redux/store';
import { LightTheme }   from './styles/theme';

ReactDOM.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <MuiThemeProvider theme={LightTheme}>
                <AppRoot/>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);