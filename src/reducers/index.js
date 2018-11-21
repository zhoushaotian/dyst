import {combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import study from './study';
import organization from './organization';

const appReducer = combineReducers({
    modal,
    study,
    organization,
    routing: routerReducer
});

export default appReducer;