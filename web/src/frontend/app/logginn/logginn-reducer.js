import { InnloggingsStatus, LOGG_INN } from './logginn-actions'

const DEFAULT_STATE = {
    status: InnloggingsStatus.LOGGET_UT
};

export default function loggInn(state = DEFAULT_STATE, action){
    switch (action.type) {
        case LOGG_INN:
            var navEpostRegex = /([a-zA-Z].+@nav.no)$/;
            if (!navEpostRegex.test(action.data.email)){
                return state;
            }
            return {
                type: InnloggingsStatus.LOGGET_INN,
                data: action.data
            };
        default:
            return state; 
    }
};