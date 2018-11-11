import {
    UPDATE_STUDY_CATEGORY, 
    CLEAN_STUDY_CATEGORY, 
    UPDATE_STUDY_LIST, 
    CLEAN_STUDY_LIST,
    UPDATE_STUDY_DETAIL,
    CLEAN_STUDY_DETAIL
} from '../actions/study';

const INIT_STATE = {
    category: [],
    list: [],
    detail: {}
};


export default function(state = INIT_STATE, action) {
    switch(action.type) {
    case CLEAN_STUDY_DETAIL:
        return Object.assign({}, state, {
            detail: action.data
        });
    case UPDATE_STUDY_DETAIL:
        return Object.assign({}, state, {
            detail: action.data
        });
    case UPDATE_STUDY_CATEGORY:
        return Object.assign({}, state, {
            category: action.data
        });
    case CLEAN_STUDY_CATEGORY:
        return Object.assign({}, state, {
            category: []
        });
    case UPDATE_STUDY_LIST:
        return Object.assign({}, state, {
            list: action.data
        });
    case CLEAN_STUDY_LIST:
        return Object.assign({}, state, {
            list: []
        });
    default:
        return state;
    }
}