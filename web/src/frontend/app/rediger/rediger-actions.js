import { fetchToJson } from './../felles/utils';

export const HENT_LEDETEKST = 'HENT_LEDETEKST';
export const FAA_LEDETEKST = 'FAA_LEDETEKST';
export const PUT_LEDETEKST = 'PUT_LEDETEKST';

export function hentLedetekst(nokkel, spraak) {
    return {
        type: HENT_LEDETEKST,
        data: [nokkel, spraak]
    };
}

export function faaLedetekst(data) {
    return {
        type: FAA_LEDETEKST,
        data
    };
}

export function putLedetekst(data) {
    return {
        type: PUT_LEDETEKST,
        data
    };
}

export function fetchLedetekst(nokkel, spraak) {
    const url = `/tekster/${encodeURIComponent('sbl-veiledningarbeidssoker')}/{nokkel}&{spraak}`;
    return dispatch => {
        dispatch(hentLedetekst(nokkel, spraak));
        return fetchToJson(url)
            .then((response) =>
                dispatch(faaLedetekst(response)));
    };
}

export function sendRedigertTekst(data) {
    const url = `/tekster/${encodeURIComponent('sbl-veiledningarbeidssoker')}/{nokkel}&{spraak}`;
    return dispatch => {
        dispatch(putLedetekst(data));
        return fetch(url, {
            method: 'PUT',
            body: data
        });
    };
}
