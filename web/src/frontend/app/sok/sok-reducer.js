import { UPDATE_LOCATION } from 'react-router-redux';
import deepFreeze from 'deep-freeze';
import { SETT_SOKETEKST } from './sok-actions';

export default function sok(state = { soketekst: '' }, action) {
    switch (action.type) {
        case SETT_SOKETEKST:
            return deepFreeze({ ...state, soketekst: action.soketekst });
        case UPDATE_LOCATION:
            return deepFreeze({ ...state, soketekst: action.payload.query.sok });
        default:
            return deepFreeze(state);
    }
}
