import { LOCATION_CHANGE } from 'react-router-redux';
import deepFreeze from 'deep-freeze';

export default function sok(state = { sokeQuery: '' }, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return deepFreeze({
                ...state,
                sokeQuery: action.payload.query.sokeQuery
            });
        default:
            return deepFreeze(state);
    }
}
