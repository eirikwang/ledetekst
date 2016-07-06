import {receiveTekster} from './../tekster/tekster-actions';
import {oppdaterLedetekstListe} from './../felles/utils';

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
    const url = `api/tekster/ledertekst-temp/${nokkel}`;
    const body = {
        nokkel,
        spraak: { [spraak]: tekst }
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
            const ledetekst = {
                nokkel,
                spraak,
                tekst
            };
            const teksterKopi = JSON.parse(JSON.stringify(getState().tekster.data));
            oppdaterLedetekstListe(teksterKopi, ledetekst);
            
            dispatch(putsuccLedetekst(response));
            dispatch(receiveTekster(teksterKopi));
        }).catch((error) => {
            console.log(error);
            dispatch(putfeilLedetekst(error))

        });
    };
}
