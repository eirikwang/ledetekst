import { hentNavnFraEpost } from './../felles/utils';

export const LOGG_INN = 'LOGG_INN';
export const LOGG_UT = 'LOGG_UT';
export const EPOST_UGYLDIG = 'EPOST_UGYLDIG';

export const InnloggingsStatus = {
    LOGGET_INN: 'LOGGET_INN',
    LOGGET_UT: 'LOGGET_UT'
};

function erGyldigEpost(epost) {
    const navEpostRegex = /([a-zA-Z].+@nav.no)$/;
    return navEpostRegex.test(epost);
}

export function loggInn(epost) {
    if (erGyldigEpost(epost)) {
        const navn = hentNavnFraEpost(epost);
        return {
            type: LOGG_INN,
            data: { navn, epost }
        };
    }
    return {
        type: EPOST_UGYLDIG
    };
}

export function loggUt() {
    return {
        type: LOGG_UT,
        data: {}
    };
}
