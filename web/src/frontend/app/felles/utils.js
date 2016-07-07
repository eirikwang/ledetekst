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
                console.error(error, error.stack, data);
                dispatch({ type: action, data: { response: error.response, data } });
            });
        } else {
            console.error(error, error.stack);
            dispatch({ type: action, data: error.toString() });
        }
    };
}

export function autobind(ctx) {
    Object.getOwnPropertyNames(ctx.constructor.prototype)
        .filter((prop) => typeof ctx[prop] === 'function')
        .forEach((method) => {
            // eslint-disable-next-line
            ctx[method] = ctx[method].bind(ctx);
        });
}

export function finnTekst(queryNokkel, querySpraak, tekster) {
    const teksterForNokkel = tekster.find(t => t.nokkel === queryNokkel);
    if (teksterForNokkel.length < 1) {
        console.log('Fant ikke tekster for denne nøkkelen');
        return '';
    }
    const teksterForSpraak = teksterForNokkel.spraak;
    if (!(querySpraak in teksterForSpraak)) {
        console.log('Fant ikke tekst for språket og nøkkelen');
        return '';
    }
    return teksterForSpraak[querySpraak];
}

export function hentNavnFraEpost(epost) {
    return epost.substring(0, epost.indexOf('@')).replace(/\./g, ' ');
}

export function hentLedetekstIndex(tekster, endretTekst) {
    return tekster.findIndex(t => t.nokkel === endretTekst.nokkel);
}

export function storForbokstavPaaHvertOrd(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

