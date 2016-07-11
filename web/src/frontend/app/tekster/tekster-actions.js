import { fetchToJson } from './../felles/utils';

export const REQUEST_TEKSTER = 'REQUEST_TEKSTER';
export const RECEIVE_TEKSTER = 'RECEIVE_TEKSTER';
export const RECEIVE_FEIL = 'RECEIVE_FEIL';
export const OPPDATER_TEKST = 'OPPDATER_TEKST';

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
        data: error
    };
}

export function oppdaterTekst(data) {
    return {
        type: OPPDATER_TEKST,
        data
    };
}

export function fetchTekster(applikasjon) {
    const url = `/tekster/${applikasjon}`;
    return dispatch => {
        dispatch(sendRequest(url));
        return fetchToJson(url)
            .then((response) =>
                dispatch(receiveTekster(response)))
            .catch((error) =>
                dispatch(receiveFeil(error)));
    };
}
