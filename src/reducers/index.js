import {combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import study from './study';

const appReducer = combineReducers({
    modal,
    study,
    routing: routerReducer
});

export default appReducer;