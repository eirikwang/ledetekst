import { STATUS } from './../felles/konstanter';
import { REQUEST_APPLIKASJONER, RECEIVE_APPLIKASJONER, RECEIVE_FEIL_APPLIKASJONER } from './applikasjoner-actions';
import deepFreeze from 'deep-freeze';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    data: []
};

export default function applikasjoner(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REQUEST_APPLIKASJONER:
            return deepFreeze({ ...state, status: STATUS.laster });
        case RECEIVE_APPLIKASJONER:
            return deepFreeze({ ...state, status: STATUS.lastet, data: action.data });
        case RECEIVE_FEIL_APPLIKASJONER:
            return deepFreeze({ ...state, status: STATUS.feilet, data: action.data });
        default:
            return state;
    }
}
