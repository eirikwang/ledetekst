import { fetchToJson } from './../felles/utils';

export const REQUEST_TEKSTER = 'REQUEST_TEKSTER';
export const RECEIVE_TEKSTER = 'RECEIVE_TEKSTER';
export const RECEIVE_FEIL = 'RECEIVE_FEIL';

export function sendRequest(data) {
    return {
        type: REQUEST_TEKSTER,
        data
    };
}

export function receiveTekster(data) {
    return {
        type: RECEIVE_TEKSTER,
        data
    };
}

export function receiveFeil(error) {
    return {
        type: RECEIVE_FEIL,
        error
    };
}

export function fetchTekster(data) {
    return dispatch => {
        dispatch(sendRequest(data));
        return fetchToJson(data)
            .then((response) =>
                dispatch(receiveTekster(response)))
            .catch((error) =>
                dispatch(receiveFeil(error)));
    };
}
