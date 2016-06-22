import fetch from 'isomorphic-fetch';

/**
 * Action creators for tekster. Tre muligheter her: Kan sende en request,
 * få en suksessfull response, eller få en response med feilmld
*/

/**
 * Oppdater staten med requesten vi sender. Når vi får svar, oppdaterer vi
 * staten med resultatet av kallet
 */
function fetchTekster (data){
    return dispatch => {
        dispatch(sendRequest(data))
        return fetch('/tekster')
            .then(response => response.json())
            .then(json => dispatch(receiveTekster(json)));
    };
}

export const REQUEST_TEKSTER = 'REQUEST_TEKSTER';
export function sendRequest (data){
    return {
        type: REQUEST_TEKSTER,
        data
    };
}

export const RECEIVE_TEKSTER = 'RECEIVE_TEKSTER';
export function receiveTekster (data){
    return {
        type: RECEIVE_TEKSTER,
        data
    };
}

export const RECEIVE_FEIL = 'RECEIVE_FEIL';
export function receiveFeil (error) {
    return {
        type:RECEIVE_FEIL,
        error
    }
}

