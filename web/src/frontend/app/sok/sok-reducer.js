import { QUERIED_TEKSTER, queryStatus } from './sok-actions';
import deepFreeze from 'deep-freeze';

const DEFAULT_STATE = {
    status: queryStatus.IKKEHENTET_QUERY,
    query: ''
};

export default function sok(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case QUERIED_TEKSTER :
            return deepFreeze({ ...state, status: queryStatus.HENTET_QUERY, query: action.data });
        default:
            return deepFreeze(state);
    }
}
