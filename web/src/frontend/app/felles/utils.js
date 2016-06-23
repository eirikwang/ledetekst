import { RESTURL } from './konstanter';

export function erDevUrl(url) {
    return url.includes('debug=true') || url.includes('devillo.no:8182') || url.includes('localhost:8182');
}

export const erDev = () => erDevUrl(window.location.href);


export function sjekkStatuskode(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function toJson(response) {
    return response.json();
}

export function fetchToJson(url, config = {}) {
    return fetch(RESTURL + url, { ...config })
        .then(sjekkStatuskode)
        .then(toJson);
}

export function sendResultatTilDispatch(dispatch, action) {
    return data => dispatch({ type: action, data });
}

export function handterFeil(dispatch, action) {
    return error => {
        if (error.response) {
            error.response.json().then((data) => {
                console.error(error, error.stack, data); // eslint-disable-line no-console
                dispatch({ type: action, data: { response: error.response, data } });
            });
        } else {
            console.error(error, error.stack); // eslint-disable-line no-console
            dispatch({ type: action, data: error.toString() });
        }
    };
}
