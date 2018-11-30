import fetchData from '../common/api';
import {updateLayoutLoading} from './modal';
import {message} from '../common/tool';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const CLEAN_USER_INFO = 'CLEAN_USER_INFO';


export function fetchUserStudyRecord(query) {
    return fetchData('getStudyRecord', query);
}

export function fetchUserCategoryRecord(query) {
    return fetchData('getCategoryRecord', query);
}


export function updateUserInfo(data) {
    return {
        type: UPDATE_USER_INFO,
        data
    };
}
export function cleanUserInfo() {
    return {
        type: CLEAN_USER_INFO,
    };
}

export function fetchUserInfo() {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        // if(process.ENV === 'dev') {
        //     return fetchData('devUser')
        //         .then(function() {
        //             fetchData('userInfo')
        //                 .then(function(res) {
        //                     dispatch(updateUserInfo(res.data));
        //                     dispatch(updateLayoutLoading({
        //                         loadingData: false
        //                     }));
        //                 }).catch(function(err) {
        //                     dispatch(updateLayoutLoading({
        //                         loadingData: false
        //                     }));
        //                     message.error(err.message);
        //                 });
        //         });
        // }
        fetchData('userInfo')
            .then(function(res) {
                dispatch(updateUserInfo(res.data));
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
            }).catch(function(err) {
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
                message.error(err.message);
            });
    };
}