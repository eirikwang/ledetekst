/**
 * Action creators for tekster. Tre muligheter her: Kan sende en request,
 * få en suksessfull response, eller få en response med feilmld
*/

/**
 * Oppdater staten med requesten vi sender. Når vi får svar, oppdaterer vi
 * staten med resultatet av kallet
 */

export const REQUEST_TEKSTER = 'REQUEST_TEKSTER';
export function sendRequest (data){
    return {
        type: REQUEST_TEKSTER,
        data: data
    };
}

export const RECEIVE_TEKSTER = 'RECEIVE_TEKSTER';
export function receiveTekster (data){
    return {
        type: RECEIVE_TEKSTER,
        data: data
    };
}

export const RECEIVE_FEIL = 'RECEIVE_FEIL';
export function receiveFeil (error) {
    return {
        type: RECEIVE_FEIL,
        data: error
    }
}

export function fetchTekster (data){
    return dispatch => {
        dispatch(sendRequest(data))
        return fetch(data)
            .then(function (response){
                dispatch(receiveTekster(response.json()));
            })
            .catch(function (error){
                dispatch(receiveFeil(error));
            });
    };
}


