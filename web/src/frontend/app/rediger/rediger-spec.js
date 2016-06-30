/* eslint-env mocha */
import { expect } from './../../test-helper';
import rediger from './rediger-reducer';
import { faattLedetekst } from './rediger-actions';

describe('Reducer for Rediger-komponent', () => {
    it('Skal ha riktig initial state', () => {
        expect(rediger(undefined, {}).status).to.be.equal('ikkelastet');
    });

    it('Skal oppdatere staten riktig for FAATT_LEDETEKST', () => {
        const action = faattLedetekst('testnokkel', 'testspraak', 'testinnhold');
        expect(rediger({}, action)).to.be.eql({
            status: 'lastet',
            data: {
                innhold: 'testinnhold',
                nokkel: 'testnokkel',
                spraak: 'testspraak'
            }
        });
    });
});
