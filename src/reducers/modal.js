import {UPDATE_LAYOUT_LOADING, UPDATE_TOAST} from '../actions/modal';

const INIT_STATE = {
    loadingData: false,
    loadingForm: false,
    toastType: 'warn',
    toastMsg: '',
    showToast: false,
    pageWarn: ''
};

export default function post(state = INIT_STATE, action) {
    switch (action.type) {
    case UPDATE_LAYOUT_LOADING:
        return Object.assign({}, state, action.data);  
    case UPDATE_TOAST:
        return Object.assign({}, state, action.data);
    default:
        return state;
    }
}