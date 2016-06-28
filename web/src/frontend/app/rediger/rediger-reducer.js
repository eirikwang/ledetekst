import { STATUS } from './../felles/konstanter';
import { HENT_LEDETEKST, FAA_LEDETEKST, PUT_LEDETEKST } from './rediger-actions';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    nokkel: '',
    spraak: ''
}

export default function rediger(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case HENT_LEDETEKST:
            return {...state, status: STATUS.laster};
        case FAA_LEDETEKST:
            return {...state, status: STATUS.lastet};
        case PUT_LEDETEKST:
            return {...state, status: STATUS.laster};
    }
}
