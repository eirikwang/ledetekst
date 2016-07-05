import { InnloggingsStatus, LOGG_INN, EPOST_UGYLDIG } from './logginn-actions';

const DEFAULT_STATE = {
    status: InnloggingsStatus.LOGGET_UT
};

export default function loggInn(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOGG_INN:
            return {
                ...state,
                status: InnloggingsStatus.LOGGET_INN,
                data: action.data
            };
        case EPOST_UGYLDIG:
            return {
                ...state,
                status: InnloggingsStatus.LOGGET_UT
            };
        default:
            return state;
    }
}
