import { InnloggingsStatus, LOGG_INN } from './logginn-actions'

const DEFAULT_STATE = {
    status: InnloggingsStatus.LOGGET_UT
};

export default function loggInn(state = DEFAULT_STATE, action){
    switch (action.type) {
        case LOGG_INN:
            if (!(new RegExp('([a-zA-Z].+@nav.no)$').test(action.email))){
                return state;
            }
            return {
                type: InnloggingsStatus.LOGGET_INN,
                navn: action.navn,
                email: action.email
            };
        default:
            return state; 
    }
};

