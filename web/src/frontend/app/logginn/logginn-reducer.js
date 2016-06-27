import { InnloggingsStatus, LOGG_INN } from './logginn-actions'

const DEFAULT_STATE = {
    status: InnloggingsStatus.LOGGET_UT
};

export default function logginn(state = DEFAULT_STATE, action){
    switch (action.type) {
        case LOGG_INN:
            return {
                navn: action.navn,
                email: action.email
            };
        default:
            return state; 
    }
};

