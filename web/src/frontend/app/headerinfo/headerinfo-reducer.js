import { LOCATION_CHANGE } from 'react-router-redux';

const DEFAULT_STATE = {
    data: {}
};

export default function headerinfo(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            console.log(action);
            return state;
        default:
            return state;
    }
}