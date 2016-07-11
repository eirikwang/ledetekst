import { oppdaterTekst } from './../tekster/tekster-actions';
import { hentLedetekstIndex } from './../felles/utils';
import { push } from 'react-router-redux';

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
    console.error(error, error.stack);
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

export function sendRedigertTekst(applikasjon, nokkel, spraak, tekst, kommentar) {
    const url = `/ledeteksteditor/api/tekster/${applikasjon}/${nokkel}`;
    const body = {
        nokkel,
        spraak: { [spraak]: tekst },
        kommentar
    };

    return (dispatch, getState) => {
        dispatch(putLedetekst(nokkel, spraak, tekst));
        return fetch(url, {
            method: 'PUT',
            headers: new Headers({
                navn: getState().autentisert.data.navn,
                epost: getState().autentisert.data.epost,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        }).then((response) => {
            const ledetekst = { nokkel, spraak, tekst };
            ledetekst.index = hentLedetekstIndex(getState().tekster.data, ledetekst);
            dispatch(push(`/tekster/${applikasjon}`));
            dispatch(putsuccLedetekst(response));
            dispatch(oppdaterTekst(ledetekst));
        }).catch((error) => {
            console.error(error, error.stack);
            dispatch(putfeilLedetekst(error));
        });
    };
}
