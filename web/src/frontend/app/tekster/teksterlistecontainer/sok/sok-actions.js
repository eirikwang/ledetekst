export const OPPDATER_TEMPSOKETEKST = 'OPPDATER_TEMPSOKETEKST';

export function oppdaterSokeboksVerdi(sokeboksVerdi) {
    return { type: OPPDATER_TEMPSOKETEKST, sokeboksVerdi };
}
