import { STATUS } from './../felles/konstanter';
import { REQUEST_TEKSTER, RECEIVE_TEKSTER, RECEIVE_FEIL, OPPDATER_TEKST } from './tekster-actions';

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
        case OPPDATER_TEKST: {
            const newLedetekstState = { ...state.data[action.data.index] };
            newLedetekstState.spraak[action.data.spraak] = action.data.tekst;
            return { ...state, data: [... state.data, ...newLedetekstState] };
        }
        default:
            return state;
    }
}
