import {store} from '../store';

import {updateToast} from '../actions/modal';

function getHandleMessage(msg, type, time = 3000) {
    return function() {
        store.dispatch(updateToast({
            toastType: type,
            toastMsg: msg,
            showToast: true
        }));
        setTimeout(function() {
            store.dispatch(updateToast({
                showToast: false
            }));
        }, time);
    };
}

export const message = {
    error: function(msg, time) {
        getHandleMessage(msg, 'warn', time)();
    },
    success: function(msg, time) {
        getHandleMessage(msg, 'success', time)();
    }
};

export function getQuery(routing) {
    return routing.location ? routing.location.query : {};
}