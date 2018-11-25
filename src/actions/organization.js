import fetchData from '../common/api';
import {updateLayoutLoading} from './modal';
import {message} from '../common/tool';

export const UPDATE_IDCARD_INFO = 'UPDATE_IDCARD_INFO';
export const CLEAN_IDCARD_INFO = 'CLEAN_IDCARD_INFO';
export const UPDATE_CASH_MONTH = 'UPDATE_CASH_MONTH';
export const CLEAN_CASH_MONTH = 'CLEAN_CASH_MONTH';
export const UPDATE_PARTY_ORG = 'UPDATE_PARTY_ORG';
export const CLEAN_PARTY_ORG = 'CLEAN_PARTY_ORG';
export const UPDATE_METRIX = 'UPDATE_METRIX';
export const CLEAN_METRIX = 'CLEAN_METRIX';

export function updateMetrix(data) {
    return {
        type: UPDATE_METRIX,
        data
    };
}


export function updatePartyOrg(data) {
    return {
        type: UPDATE_PARTY_ORG,
        data
    };
}

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

export function fetchMetrix() {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        fetchData('userMatrix')
            .then(function(res) {
                dispatch(updateMetrix(res.data));
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
export function fetchPartyOrg() {
    return function(dispatch) {
        dispatch(updateLayoutLoading({
            loadingData: true
        }));
        fetchData('party')
            .then(function(res) {
                dispatch(updatePartyOrg(res.data));
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