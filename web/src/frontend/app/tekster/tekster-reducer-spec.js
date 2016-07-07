/* eslint-env mocha */
import { expect } from './../../test-helper';
import { OPPDATER_TEKST } from './../tekster/tekster-actions';
import tekster from './../tekster/tekster-reducer';

describe('Tekster-reducer', () => {
    it('Skal oppdatere tekster ved redigering av tekst', () => {
        const data = [
            {
                nokkel: 'nokkel',
                spraak: { nb: 'dette er ikke endret tekst' }
            }
        ];
        const action = {
            type: OPPDATER_TEKST,
            data: {
                nokkel: 'nokkel',
                spraak: 'nb',
                tekst: 'endret tekst',
                index: 0
            }
        };
        const state = tekster({ data }, action);
        expect(state.data[0].spraak.nb).to.be.equal(action.data.tekst);
    });
});
