export const SETT_SOKETEKST = 'SETT_SOKETEKST';

export function settSoketekst(soketekst) {
    console.log(soketekst)
    return { type: SETT_SOKETEKST, soketekst: soketekst.target.value };
}
