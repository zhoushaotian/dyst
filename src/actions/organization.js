import fetchData from '../common/api';
import {updateLayoutLoading} from './modal';
import {message} from '../common/tool';

export const UPDATE_IDCARD_INFO = 'UPDATE_IDCARD_INFO';
export const CLEAN_IDCARD_INFO = 'CLEAN_IDCARD_INFO';
export const UPDATE_CASH_MONTH = 'UPDATE_CASH_MONTH';
export const CLEAN_CASH_MONTH = 'CLEAN_CASH_MONTH';


export function updateCashMonth(data) {
    return {
        type: UPDATE_CASH_MONTH,
        data
    };
}

export function cleanCashMonth() {
    return {
        type: CLEAN_CASH_MONTH
    };
}

export function updateIdCardInfo(data) {
    return {
        type: UPDATE_IDCARD_INFO,
        data
    };
}

export function cleanIdCardInfo() {
    return {
        type: CLEAN_IDCARD_INFO
    };
}

export function fetchIdCardInfo(query, cb) {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        fetchData('idCardInfo', query)
            .then(function(res) {
                dispatch(updateIdCardInfo(res.data));
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
                if(typeof cb === 'function') cb(res.data);
            }).catch(function(err) {
                dispatch(updateLayoutLoading({
                    loadingData: false
                }));
                message.error(err.message);
            });
    };
}

export function fetchCashMonth(query) {
    return function(dispatch) {
        fetchData('cashMonth', query)
            .then(function(res) {
                dispatch(updateCashMonth(res.data));
            }).catch(function(err) {
                message.error(err.message);
            });
    };
}