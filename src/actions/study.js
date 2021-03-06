import fetchData from '../common/api';
import {updateLayoutLoading} from './modal';
import {message} from '../common/tool';


export const UPDATE_STUDY_CATEGORY = 'UPDATE_STUDY_CATEGORY';
export const CLEAN_STUDY_CATEGORY = 'CLEAN_STUDY_CATEGORY';
export const UPDATE_STUDY_LIST = 'UPDATE_STUDY_LIST';
export const CLEAN_STUDY_LIST = 'CLEAN_STUDY_LIST';
export const UPDATE_STUDY_DETAIL = 'UPDATE_STUDY_DETAIL';
export const CLEAN_STUDY_DETAIL = 'CLEAN_STUDY_DETAIL';

export function collectStudy(query) {
    return function () {
        fetchData('collectStudy', query, 'post')
            .then(function() {
                fetchStudyDetail(query);
            }).catch(function(err) {
                message.error(err.message || '收藏失败');
            });
        
    };
}

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

export function fetchStudyCategory(query, resolve, finish) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        if(process.ENV === 'dev') {
            return fetchData('devLogin')
                .then(function() {
                    fetchData('studyCategory', query)
                        .then(function(res) {
                            if(res.data.rows.length === 0) {
                                return finish();
                            }
                            dispatch(updateStudyCategory({
                                content: res.data.rows,
                                limit: query.limit,
                                offset: query.offset
                            }));
                            dispatch(updateLayoutLoading({
                                loadingData: false
                            }));
                            resolve();
                        }).catch(function(err) {
                            dispatch(updateLayoutLoading({
                                loadingData: false,
                                pageWarn: err.message
                            }));
                        });
                });
        }
        fetchData('studyCategory', query)
            .then(function(res) {
                if(res.data.rows === 0) {
                    return finish();
                }
                dispatch(updateStudyCategory({
                    content: res.data.rows,
                    limit: query.limit,
                    offset: query.offset
                }));
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
                resolve();
            }).catch(function(err) {
                dispatch(updateLayoutLoading({
                    loadingData: false,
                    pageWarn: err.message
                }));
            });
    };
}

export function fetchStudyList(query, resolve, finish) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingStudyList: true
        }));
        fetchData('studyList', query)
            .then(function(res) {
                if(res.data.rows.length === 0 && typeof finish === 'function') {
                    return finish();
                }
                dispatch(updateStudyList({
                    content: res.data.rows,
                    limit: query.limit,
                    offset: query.offset
                }));
                dispatch(updateLayoutLoading({
                    loadingStudyList: false
                }));
                if(typeof resolve === 'function') resolve();
            });
        
    };
}

export function fetchStudyDetail(query, cb) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        fetchData('studyDetail', query)
            .then(function(res) {
                dispatch(updateStudyDetail(res.data));
                if(typeof cb === 'function') cb();
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
            }).catch(function(err) {
                message.error(err.message);
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