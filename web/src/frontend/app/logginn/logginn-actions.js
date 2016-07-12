import { hentNavnFraEpost, storForbokstavPaaHvertOrd, erGyldigEpost } from './../felles/utils';
import { replace } from 'react-router-redux';

export const LOGG_INN = 'LOGG_INN';
export const LOGG_UT = 'LOGG_UT';
export const EPOST_UGYLDIG = 'EPOST_UGYLDIG';

export const InnloggingsStatus = {
    LOGGET_INN: 'LOGGET_INN',
    LOGGET_UT: 'LOGGET_UT',
    LOGGINN_FEILET: 'LOGGINN_FEILET'
};


export function loggInn(epost, nesteSide = { pathname: '/', query: {} }) {
    if (erGyldigEpost(epost)) {
        const navn = storForbokstavPaaHvertOrd(hentNavnFraEpost(epost));
        return (dispatch) => {
            dispatch({
                type: LOGG_INN,
                data: { navn, epost }
            });
            dispatch(replace(nesteSide));
        };
    }
    return {
        type: EPOST_UGYLDIG,
        data: { epost }
    };
}

export function loggUt() {
    return {
        type: LOGG_UT,
        data: {}
    };
}
