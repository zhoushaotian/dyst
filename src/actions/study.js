import fetchData from '../common/api';
import {updateLayoutLoading} from './modal';


export const UPDATE_STUDY_CATEGORY = 'UPDATE_STUDY_CATEGORY';
export const CLEAN_STUDY_CATEGORY = 'CLEAN_STUDY_CATEGORY';
export const UPDATE_STUDY_LIST = 'UPDATE_STUDY_LIST';
export const CLEAN_STUDY_LIST = 'CLEAN_STUDY_LIST';
export const UPDATE_STUDY_DETAIL = 'UPDATE_STUDY_DETAIL';
export const CLEAN_STUDY_DETAIL = 'CLEAN_STUDY_DETAIL';

export function updateStudyDetail(data) {
    return {
        type: UPDATE_STUDY_DETAIL,
        data
    };
}

export function cleanStudyDetail() {
    return {
        type: CLEAN_STUDY_DETAIL
    };
}

export function updateStudyList(data) {
    return {
        type: UPDATE_STUDY_LIST,
        data
    };
}

export function cleanStudyList() {
    return {
        type: CLEAN_STUDY_LIST
    };
}

export function updateStudyCategory(data) {
    return {
        type: UPDATE_STUDY_CATEGORY,
        data
    };
}

export function cleanStudyCategory() {
    return {
        type: CLEAN_STUDY_CATEGORY
    };
}

export function fetchStudyCategory(isFirst) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        if(process.ENV === 'dev') {
            return fetchData('devLogin')
                .then(function() {
                    fetchData('studyCategory')
                        .then(function(res) {
                            if(isFirst) {
                                dispatch(fetchStudyList({
                                    id: res.data.rows[0].id
                                }));
                            }
                            dispatch(updateStudyCategory(res.data.rows));
                            dispatch(updateLayoutLoading({
                                loadingData: false
                            }));
                        }).catch(function(err) {
                            dispatch(updateLayoutLoading({
                                loadingData: false,
                                pageWarn: err.message
                            }));
                        });
                });
        }
        fetchData('studyCategory')
            .then(function(res) {
                if(isFirst) {
                    dispatch(fetchStudyList({
                        id: res.data.rows[0].id
                    }));
                }
                dispatch(updateStudyCategory(res.data.rows));
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
            }).catch(function(err) {
                dispatch(updateLayoutLoading({
                    loadingData: false,
                    pageWarn: err.message
                }));
            });
    };
}

export function fetchStudyList(query) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingStudyList: true
        }));
        fetchData('studyList', query)
            .then(function(res) {
                dispatch(updateStudyList(res.data.rows));
                dispatch(updateLayoutLoading({
                    loadingStudyList: false
                }));
            });
        
    };
}

export function fetchStudyDetail(query, cb) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingStudyDetail: true
        }));
        fetchData('studyDetail', query)
            .then(function(res) {
                dispatch(updateStudyDetail(res.data));
                if(typeof cb === 'function') cb();
                dispatch(updateLayoutLoading({
                    loadingStudyDetail: false
                }));
            });
    };
}

export function recordStudyTime(query) {
    return function() {
        fetchData('studyRecord', query, 'post')
            .then(function() {
                
            });
    };
}