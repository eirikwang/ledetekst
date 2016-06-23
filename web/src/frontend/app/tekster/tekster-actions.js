import { fetchToJson } from './../felles/utils';

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
        dispatch(sendRequest(data));
        return fetchToJson(data)
            .then(function (response){
                dispatch(receiveTekster(response));
            })
            .catch(function (error){
                dispatch(receiveFeil(error));
            });
    };
}


