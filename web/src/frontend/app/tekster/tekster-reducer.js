import { STATUS } from './../felles/konstanter';
import { REQUEST_TEKSTER, RECEIVE_TEKSTER, RECEIVE_FEIL, OPPDATER_TEKST } from './tekster-actions';
import deepFreeze from 'deep-freeze';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    data: {
        tekster: []
    }
};

export default function tekster(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUEST_TEKSTER:
            return deepFreeze({ ...state, status: STATUS.laster });
        case RECEIVE_TEKSTER:
            return deepFreeze({ ...state, status: STATUS.lastet, data: action.data });
        case RECEIVE_FEIL:
            return deepFreeze({ ...state, status: STATUS.feilet, data: action.data });
        case OPPDATER_TEKST: {
            const data = JSON.parse(JSON.stringify((state.data)));
            const tekst = data[action.data.index];

            tekst.spraak[action.data.spraak] = action.data.tekst;

            return deepFreeze({ ...state, data });
        }
        default:
            return deepFreeze(state);
    }
}
