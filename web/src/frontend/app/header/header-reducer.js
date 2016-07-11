import { LOCATION_CHANGE } from 'react-router-redux';

const DEFAULT_STATE = {
    pathname: ''
};

export default function header(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return { ...state, pathname: action.payload.pathname };
        default:
            return state;
    }
}
