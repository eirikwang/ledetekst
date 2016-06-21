import { fetchToJson, sendResultatTilDispatch, handterFeil } from './utils';
import deepFreeze from 'deep-freeze';

export const LASTER_MELDINGER = 'LASTER_MELDINGER';
export const LASTET_MELDINGER = 'LASTET_MELDINGER';
export const FEIL_MELDINGER = 'FEIL_MELDINGER';


const defaultstate = {
    locale: 'nb',
    messages: {},
    defaultLocale: 'nb'
};
export default function meldingerReducer(state = defaultstate, action) {
    switch (action.type) {
        case LASTET_MELDINGER:
            return deepFreeze({ ...state, messages: action.data });
        default:
            return deepFreeze(state);
    }
}

function leggCmsKeyPaaMeldinger(dispatch, visCmsKeys) {
    return ({ type, data }) => {
        if (visCmsKeys) {
            const meldinger = {};
            Object.keys(data).forEach(key => {
                meldinger[key] = `${data[key]} [${key}]`;
            });
            return dispatch({ type, data: meldinger });
        }
        return data;
    };
}

export function lastMeldinger(visCmsKeys) {
    return (dispatch) => {
        dispatch({ type: LASTER_MELDINGER });

        return fetchToJson('/tekster?lang=nb')
            .then(sendResultatTilDispatch(dispatch, LASTET_MELDINGER))
            .then(leggCmsKeyPaaMeldinger(dispatch, visCmsKeys))
            .catch(handterFeil(dispatch, FEIL_MELDINGER));
    };
}
