import createBrowserHistory from 'history/createBrowserHistory';
import {
    routerMiddleware,
    routerReducer,
    RouterState
}                           from 'react-router-redux';
import {
    applyMiddleware,
    combineReducers,
    createStore,
    Dispatch
}                           from 'redux';
import logger               from 'redux-logger';
import thunk                from 'redux-thunk';
import * as Database        from './database/database.reducer';

export interface StoreState {
    routing: RouterState;
    database: Database.TState;
}

const reducers = combineReducers(
    {
        routing: routerReducer,
        database: Database.Reducer
    });

export const browserHistory = createBrowserHistory();

export const Store = createStore(reducers,
                                 applyMiddleware(
                                     logger,
                                     thunk,
                                     routerMiddleware(browserHistory)));

export type StoreDispatch = Dispatch<StoreState>;