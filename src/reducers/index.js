import {combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import study from './study';
import organization from './organization';
import account from './account';

const appReducer = combineReducers({
    modal,
    study,
    organization,
    account,
    routing: routerReducer
});

export default appReducer;