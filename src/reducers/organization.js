import {UPDATE_IDCARD_INFO, CLEAN_IDCARD_INFO, UPDATE_CASH_MONTH, CLEAN_CASH_MONTH} from '../actions/organization';

const INIT_STATE = {
    idCardInfo: {},
    cashMonth: []
};

export default function(state = INIT_STATE, action) {
    switch(action.type) {
    case UPDATE_CASH_MONTH:
        return Object.assign({}, state, {
            cashMonth: action.data
        });
    case CLEAN_CASH_MONTH:
        return Object.assign({}, state, {
            cashMonth: []
        });
    case UPDATE_IDCARD_INFO:
        return Object.assign({}, state, {
            idCardInfo: action.data
        });
    case CLEAN_IDCARD_INFO:
        return Object.assign({}, state, {
            idCardInfo: {}
        });
    default:
        return state;
    }
}