export const LOGG_INN = 'LOGG_INN';

export const InnloggingsStatus = {
    LOGGET_INN: 'LOGGET_INN',
    LOGGET_UT: 'LOGGET_UT'

};

export const loggInn = (navn, email) => {
    console.log(navn);
    return {
        type: LOGG_INN,
        navn, 
        email
    }
};
