export const GET_TEKSTER = 'GET_TEKSTER';
export const PUT_TEKSTER = 'PUT_TEKSTER';
export const PUTSUCC_TEKSTER = 'PUTSUCC_TEKSTER';
export const PUTFAIL_TEKSTER = 'PUTFEIL_TEKSTER';

export function faattLedetekst(nokkel, spraak, innhold) {
    return {
        type: GET_TEKSTER,
        data: {
            nokkel,
            spraak,
            innhold
        }
    };
}

export function putLedetekst(nokkel, spraak, innhold) {
    return {
        type: PUT_TEKSTER,
        data: {
            nokkel,
            spraak,
            innhold
        }
    };
}

export function putfeilLedetekst(error) {
    return {
        type: PUTFAIL_TEKSTER,
        data: error
    };
}

export function putsuccLedetekst(data) {
    return {
        type: PUTSUCC_TEKSTER,
        data
    };
}

export function fetchLedetekst(nokkel, spraak, tekst) {
    return dispatch => {
        dispatch(faattLedetekst(nokkel, spraak, tekst));
    };
}

export function sendRedigertTekst(nokkel, spraak, tekst) {
    const url = `/tekster/ledertekst-temp/?nokkel=${nokkel}&spraak=${spraak}`;
    return (dispatch, getState) => {
        dispatch(putLedetekst(nokkel, spraak, tekst));
        return fetch(url, {
            method: 'PUT',
            headers: new Headers({
                navn: getState().autentisert.data.navn,
                email: getState().autentisert.data.email
            }),
            body: tekst
        })
            .then((response) =>
                dispatch(putsuccLedetekst(response)))
            .catch((error) =>
                dispatch(putfeilLedetekst(error)));
    };
}
