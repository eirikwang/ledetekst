export const FAATT_LEDETEKST = 'FAA_LEDETEKST';
export const PUT_LEDETEKST = 'PUT_LEDETEKST';

export function faattLedetekst(nokkel, spraak, innhold) {
    return {
        type: FAATT_LEDETEKST,
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

export function fetchLedetekst(nokkel, spraak, tekst) {
    return dispatch => {
        dispatch(faattLedetekst(nokkel, spraak, tekst));
    };
}

export function sendRedigertTekst(nokkel, spraak, data) {
    console.log(`Redigert tekst: ${data}`);
    /*
    return dispatch => {
        dispatch(putLedetekst(nokkel, spraak, data));
    };
    */
    const url = `/tekster/${encodeURIComponent('sbl-veiledningarbeidssoker')}/{nokkel}&{spraak}`;
    return dispatch => {
        dispatch(putLedetekst(data));
        return fetch(url, {
            method: 'PUT',
            body: data
        });
    };

}
