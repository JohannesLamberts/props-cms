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
import {
    DatabaseReducer,
    DatabaseState
}                           from './database.reducer';

export interface StoreState {
    routing: RouterState;
    database: DatabaseState;
}

const reducers = combineReducers(
    {
        routing: routerReducer,
        database: DatabaseReducer
    });

export const browserHistory = createBrowserHistory();

export const Store = createStore(reducers,
                                 applyMiddleware(
                                     logger,
                                     thunk,
                                     routerMiddleware(browserHistory)));

export type StoreDispatch = Dispatch<StoreState>;

export interface StoreDispatchProp {
    dispatch: StoreDispatch;
}