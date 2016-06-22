//import { fetchToJson } from './../felles/utils';
import { STATUS } from './../felles/konstanter';
import { REQUEST_TEKSTER, RECEIVE_TEKSTER, RECEIVE_FEIL } from './tekster-actions';

/**
 * Reducer for tekster-komponent.
 */


const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    data: {
        tekster: []
    }
};

export default function tekster(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUEST_TEKSTER:
            return { ...state, status: STATUS.laster };
        case RECEIVE_TEKSTER:
            return { ...state, status: STATUS.lastet, data: action.data };
        case RECEIVE_FEIL:
            return { ...state, status: STATUS.feilet, data: action.data };
        default:
            return state;
    }
}

/*
export function lastInnTekster() {
    return (dispatch) => {
        dispatch({ type: REQUEST_TEKSTER });
        return fetchToJson('/tekster')
            .then((resp) => dispatch({ type: RECEIVE_TEKSTER, data: resp }))
            .catch((err) => dispatch({ type: RECEIVE_FEIL, data: err }));
    };
}
*/