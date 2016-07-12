export const OPPDATER_TEMPSOKETEKST = 'OPPDATER_TEMPSOKETEKST';

export function oppdaterTempSoketekst(tempSoketekst) {
    return { type: OPPDATER_TEMPSOKETEKST, tempSoketekst };
}
