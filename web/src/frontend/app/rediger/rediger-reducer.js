import { STATUS } from './../felles/konstanter';
import { GET_TEKSTER, PUT_TEKSTER, PUTSUCC_TEKSTER, PUTFAIL_TEKSTER } from './rediger-actions';

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
        case GET_TEKSTER:
            return { ...state, status: STATUS.lastet, data: action.data };
        case PUT_TEKSTER:
            return { ...state, status: STATUS.laster, data: action.data };
        case PUTSUCC_TEKSTER:
            return { ...state, status: STATUS.lastet, data: action.data };
        case PUTFAIL_TEKSTER:
            return { ...state, status: STATUS.feilet, data: action.data };
        default:
            return state;
    }
}
