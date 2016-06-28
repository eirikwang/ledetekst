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

export function fetchTekster() {
    const url = `/tekster/${encodeURIComponent('sbl-veiledningarbeidssoker')}`;
    return dispatch => {
        dispatch(sendRequest(url));
        return fetchToJson(url)
            .then((response) =>
                dispatch(receiveTekster(response)))
            .catch((error) =>
                dispatch(receiveFeil(error)));
    };
}
