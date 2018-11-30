import {UPDATE_USER_INFO, CLEAN_USER_INFO, UPDATE_USER_CATEGORY_RECORD, UPDATE_USER_STUDY_RECORD} from '../actions/account';

const INIT_SATE = {
    info: {},
    categoryRecord: [],
    studyRecord: []
};

export default function(state = INIT_SATE, action) {
    switch(action.type) {
    case UPDATE_USER_CATEGORY_RECORD:
        return Object.assign({}, state, {
            categoryRecord: action.data
        });
    case UPDATE_USER_STUDY_RECORD:
        return Object.assign({}, state, {
            studyRecord: action.data
        });
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