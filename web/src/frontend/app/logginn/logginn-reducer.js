import { InnloggingsStatus, LOGG_INN } from './logginn-actions';

const navEpostRegex = /([a-zA-Z].+@nav.no)$/;

const DEFAULT_STATE = {
    status: InnloggingsStatus.LOGGET_UT
};

export default function loggInn(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOGG_INN:
            if (!navEpostRegex.test(action.data.epost)) {
                return state;
            }
            return {
                ...state,
                status: InnloggingsStatus.LOGGET_INN,
                data: action.data
            };
        default:
            return state;
    }
}
