import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/';

// 加入redux-devtools
const composeEnhancers = composeWithDevTools({});

const middleware = routerMiddleware(browserHistory);

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
        thunkMiddleware,
        middleware
    ))
);

const history = syncHistoryWithStore(browserHistory, store);

exports.store = store;
exports.history = history;

