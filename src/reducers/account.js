import {UPDATE_USER_INFO, CLEAN_USER_INFO} from '../actions/account';

const INIT_SATE = {
    info: {}
};

export default function(state = INIT_SATE, action) {
    switch(action.type) {
    case UPDATE_USER_INFO:
        return Object.assign({}, state, {
            info: action.data
        });
    case CLEAN_USER_INFO:
        return Object.assign({}, state, {
            info: {}
        });
    default:
        return state;
    }
}