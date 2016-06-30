import { STATUS } from './../felles/konstanter';
import { FAATT_LEDETEKST, PUT_LEDETEKST, PUTSUCC_LEDETEKST, PUTFEIL_LEDETEKST } from './rediger-actions';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    data: {
        nokkel: '',
        spraak: '',
        innhold: ''
    }
};

export default function rediger(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FAATT_LEDETEKST:
            return { ...state, status: STATUS.lastet, data: action.data };
        case PUT_LEDETEKST:
            return { ...state, status: STATUS.laster, data: action.data };
        case PUTSUCC_LEDETEKST:
            return { ...state, status: STATUS.lastet, data: action.data };
        case PUTFEIL_LEDETEKST:
            return { ...state, status: STATUS.feilet, data: action.data };
        default:
            return state;
    }
}
