export const UPDATE_LAYOUT_LOADING = 'UPDATE_LAYOUT_LOADING';
export const UPDATE_TOAST = 'UPDATE_TOAST';


export function updateLayoutLoading(data) {
    return {
        type: UPDATE_LAYOUT_LOADING,
        data
    };
}

export function updateToast(data) {
    return {
        type: UPDATE_TOAST,
        data
    };
}
