import { fetchToJson } from './../felles/utils';
import { STATUS } from './../felles/konstanter';

/**
 * Reducer for tekster-komponent.
 */

export const LASTER_TEKSTER = 'LASTER_TEKSTER';
export const LASTET_TEKSTER = 'LASTET_TEKSTER';
export const FEIL_TEKSTER = 'FEIL_TEKSTER';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    data: {
        tekster: []
    }
};

export default function tekster(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LASTER_TEKSTER:
            return { ...state, status: STATUS.laster };
        case LASTET_TEKSTER:
            return { ...state, status: STATUS.lastet, data: action.data };
        case FEIL_TEKSTER:
            return { ...state, status: STATUS.feilet, data: action.data };
        default:
            return state;
    }
}

export function lastInnTekster() {
    return (dispatch) => {
        dispatch({ type: LASTER_TEKSTER });
        return fetchToJson('/tekster')
            .then((resp) => dispatch({ type: LASTET_TEKSTER, data: resp }))
            .catch((err) => dispatch({ type: FEIL_TEKSTER, data: err }));
    };
}
