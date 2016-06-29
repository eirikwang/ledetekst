import { STATUS } from './../felles/konstanter';
import { HENT_LEDETEKST, FAA_LEDETEKST, PUT_LEDETEKST } from './rediger-actions';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    data: {
        nokkel: '',
        spraak: '',
        innhold: ''
    }
};

export default function rediger(state = DEFAULT_STATE, action) {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case HENT_LEDETEKST:
            return { ...state, status: STATUS.laster, data: action.data };
        case FAA_LEDETEKST:
            return { ...state, status: STATUS.lastet, data: action.data };
        case PUT_LEDETEKST:
            return { ...state, status: STATUS.laster, data: action.data };
        default:
            return state;
    }
}
