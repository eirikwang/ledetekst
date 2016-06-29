import { fetchToJson } from './../felles/utils';

export const HENT_LEDETEKST = 'HENT_LEDETEKST';
export const FAA_LEDETEKST = 'FAA_LEDETEKST';
export const PUT_LEDETEKST = 'PUT_LEDETEKST';

export function hentLedetekst(nokkel, spraak) {
    return {
        type: HENT_LEDETEKST,
        data: {
            nokkel,
            spraak,
            innhold: ''
        }
    };
}

export function faaLedetekst(nokkel, spraak, innhold) {
    return {
        type: FAA_LEDETEKST,
        data: {
            nokkel,
            spraak,
            innhold
        }
    };
}

export function putLedetekst(nokkel, spraak, innhold) {
    return {
        type: PUT_LEDETEKST,
        data: {
            nokkel,
            spraak,
            innhold
        }
    };
}

export function fetchLedetekst(nokkel, spraak) {
    console.log(`Nøkkel: ${nokkel}`);
    console.log(`Språk: ${spraak}`);
    return dispatch => {
        dispatch(hentLedetekst(nokkel, spraak));
        dispatch(faaLedetekst(nokkel, spraak, 'Dummy ledetekst for å komme i gang!'));
    };
    /*
    const url = `/tekster/${encodeURIComponent('sbl-veiledningarbeidssoker')}/{nokkel}&{spraak}`;
    return dispatch => {
        dispatch(hentLedetekst(nokkel, spraak));
        return fetchToJson(url)
            .then((response) =>
                dispatch(faaLedetekst(response)));
    };
    */
}

export function sendRedigertTekst(data) {
    console.log(`Redigert tekst: ${data}`);
    return dispatch => {
        dispatch(putLedetekst('', '', data));
    };
    /*
    const url = `/tekster/${encodeURIComponent('sbl-veiledningarbeidssoker')}/{nokkel}&{spraak}`;
    return dispatch => {
        dispatch(putLedetekst(data));
        return fetch(url, {
            method: 'PUT',
            body: data
        });
    };
    */
}
