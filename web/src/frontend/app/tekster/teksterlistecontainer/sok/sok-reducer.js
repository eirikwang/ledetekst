import { UPDATE_LOCATION, LOCATION_CHANGE } from 'react-router-redux';
import deepFreeze from 'deep-freeze';
import { SETT_SOKETEKST } from './sok-actions';

export default function sok(state = { soketekst: '' }, action) {
    switch (action.type) {
        case SETT_SOKETEKST:
            return deepFreeze({ ...state, soketekst: action.soketekst });
        case LOCATION_CHANGE:
            return deepFreeze({ ...state, soketekst: action.payload.query.soketekst });
        default:
            return deepFreeze(state);
    }
}
