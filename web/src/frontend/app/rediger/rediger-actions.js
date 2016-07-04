export const FAATT_LEDETEKST = 'FAA_LEDETEKST';
export const PUT_LEDETEKST = 'PUT_LEDETEKST';
export const PUTSUCC_LEDETEKST = 'PUTSUCC_LEDETEKST';
export const PUTFEIL_LEDETEKST = 'PUTFEIL_LEDETEKST';

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

export function putfeilLedetekst(error) {
    return {
        type: PUTFEIL_LEDETEKST,
        data: error
    };
}

export function putsuccLedetekst(data) {
    return {
        type: PUTSUCC_LEDETEKST,
        data
    };
}

export function fetchLedetekst(nokkel, spraak, tekst) {
    return dispatch => {
        dispatch(faattLedetekst(nokkel, spraak, tekst));
    };
}

export function sendRedigertTekst(nokkel, spraak, tekst, navn, email) {
    const url = `/tekster/${'sbl-veiledningarbeidssoker'}/?$nokkel={nokkel}&$spraak={spraak}`;
    return dispatch => {
        dispatch(putLedetekst(nokkel, spraak, tekst));
        return fetch(url, {
            method: 'PUT',
            headers: new Headers({
                navn,
                email
            }),
            body: tekst
        })
            .then((response) =>
                dispatch(putsuccLedetekst(response)))
            .catch((error) =>
                dispatch(putfeilLedetekst(error)));
    };
}
