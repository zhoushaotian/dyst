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
    detail: {},
    categoryPage: {
        limit: 10,
        offset: 0
    },
    listPage: {
        limit: 10,
        offset: 0
    }
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
            category: state.category.concat(action.data.content),
            categoryPage: {
                limit: action.data.limit,
                offset: action.data.offset
            }
        });
    case CLEAN_STUDY_CATEGORY:
        return Object.assign({}, state, {
            category: []
        });
    case UPDATE_STUDY_LIST:
        return Object.assign({}, state, {
            list: state.list.concat(action.data.content),
            listPage: {
                limit: action.data.limit,
                offset: action.data.offset
            }
        });
    case CLEAN_STUDY_LIST:
        return Object.assign({}, state, {
            list: []
        });
    default:
        return state;
    }
}