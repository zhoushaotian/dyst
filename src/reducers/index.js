import {combineReducers } from 'redux';

import modal from './modal';
import study from './study';

const appReducer = combineReducers({
    modal,
    study
});

export default appReducer;