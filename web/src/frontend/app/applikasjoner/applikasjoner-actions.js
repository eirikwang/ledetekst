import { fetchToJson } from './../felles/utils';

export const REQUEST_APPLIKASJONER = 'REQUEST_APPLIKASJONER';
export const RECEIVE_APPLIKASJONER = 'RECEIVE_APPLIKASJONER';
export const RECEIVE_FEIL_APPLIKASJONER = 'RECEIVE_FEIL_APPLIKASJONER';

export function sendRequest(data) {
    return {
        type: REQUEST_APPLIKASJONER,
        data
    };
}

export function motattApplikasjoner(data) {
    return {
        type: RECEIVE_APPLIKASJONER,
        data
    };
}

export function receiveFeil(error) {
    return {
        type: RECEIVE_FEIL_APPLIKASJONER,
        data: error
    };
}

export function fetchApplikasjoner() {
    const url = '/applikasjoner';
    return dispatch => {
        dispatch(sendRequest(url));
        return fetchToJson(url)
            .then((response) =>
                dispatch(motattApplikasjoner(response)))
            .catch((error) =>
                dispatch(receiveFeil(error)));
    };
}
