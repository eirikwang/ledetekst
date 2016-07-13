import { InnloggingsStatus, LOGG_INN, LOGG_UT, EPOST_UGYLDIG } from './logginn-actions';

const DEFAULT_STATE = {
    status: localStorage.getItem('epost') ? InnloggingsStatus.LOGGET_INN : InnloggingsStatus.LOGGET_UT,
    data: localStorage.getItem('epost') ? {
        epost: localStorage.getItem('epost'),
        navn: localStorage.getItem('navn')
    } : {}
};

export default function loggInn(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOGG_INN:
            localStorage.setItem('epost', action.data.epost);
            localStorage.setItem('navn', action.data.navn);
            return {
                ...state,
                status: InnloggingsStatus.LOGGET_INN,
                data: action.data
            };
        case EPOST_UGYLDIG:
            return {
                ...state,
                status: InnloggingsStatus.LOGGINN_FEILET,
                data: action.data
            };
        case LOGG_UT:
            localStorage.clear();
            return {
                ...state,
                status: InnloggingsStatus.LOGGET_UT,
                data: action.data
            };
        default:
            return state;
    }
}
