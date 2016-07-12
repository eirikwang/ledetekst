import { LOCATION_CHANGE } from 'react-router-redux';
import deepFreeze from 'deep-freeze';
import { OPPDATER_TEMPSOKETEKST } from './sok-actions';

export default function sok(state = { sokeQuery: '', sokeboksVerdi: '' }, action) {
    switch (action.type) {
        case OPPDATER_TEMPSOKETEKST:
            return deepFreeze({ ...state, sokeboksVerdi: action.sokeboksVerdi });
        case LOCATION_CHANGE:
            return deepFreeze({
                ...state,
                sokeQuery: action.payload.query.sokeQuery ? action.payload.query.sokeQuery : '',
                sokeboksVerdi: action.payload.query.sokeQuery ? action.payload.query.sokeQuery : '' });
        default:
            return deepFreeze(state);
    }
}
