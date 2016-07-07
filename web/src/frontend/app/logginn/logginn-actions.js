import { hentNavnFraEpost, storForbokstavPaaHvertOrd } from './../felles/utils';
import { goBack } from 'react-router-redux';

export const LOGG_INN = 'LOGG_INN';
export const EPOST_UGYLDIG = 'EPOST_UGYLDIG';

export const InnloggingsStatus = {
    LOGGET_INN: 'LOGGET_INN',
    LOGGET_UT: 'LOGGET_UT',
    EPOST_UGYLDIG: 'EPOST_UGYLDIG'
};

function erGyldigEpost(epost) {
    const navEpostRegex = /([a-zA-Z].+@nav.no)$/;
    return navEpostRegex.test(epost);
}

export function loggInn(epost) {
    if (erGyldigEpost(epost)) {
        const navn = storForbokstavPaaHvertOrd(hentNavnFraEpost(epost));
        return (dispatch) => {
            dispatch({
                type: LOGG_INN,
                data: { navn, epost }
            });
            dispatch(goBack());
        };
    }
    return {
        type: EPOST_UGYLDIG
    };
}
