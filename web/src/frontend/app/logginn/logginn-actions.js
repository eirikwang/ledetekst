export const LOGG_INN = 'LOGG_INN';

export const InnloggingsStatus = {
    LOGGET_INN: 'LOGGET_INN',
    LOGGET_UT: 'LOGGET_UT'

};

export function loggInn(navn, epost) {
    return {
        type: LOGG_INN,
        data: { navn, epost }
    };
}
