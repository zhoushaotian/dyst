import {UPDATE_LAYOUT_LOADING} from '../actions/modal';

const INIT_STATE = {
    loadingData: false,
    loadingForm: false
};

export default function post(state = INIT_STATE, action) {
    switch (action.type) {
    case UPDATE_LAYOUT_LOADING:
        return Object.assign({}, state, action.data);    
    default:
        return state;
    }
}