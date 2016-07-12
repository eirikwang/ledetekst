import { LOCATION_CHANGE } from 'react-router-redux';
import deepFreeze from 'deep-freeze';
import { OPPDATER_TEMPSOKETEKST } from './sok-actions';

export default function sok(state = { soketekst: '', tempSoketekst: '' }, action) {
    switch (action.type) {
        case OPPDATER_TEMPSOKETEKST:
            return deepFreeze({ ...state, tempSoketekst: action.tempSoketekst });
        case LOCATION_CHANGE:
            return deepFreeze({
                ...state,
                soketekst: action.payload.query.soketekst,
                tempSoketekst: action.payload.query.soketekst ? action.payload.query.soketekst : '' });
        default:
            return deepFreeze(state);
    }
}
