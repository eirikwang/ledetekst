/* eslint-env mocha */
import { expect } from './../../test-helper';
import { LOGG_INN, EPOST_UGYLDIG, loggInn } from './logginn-actions';

describe('Innlogging Action', () => {
    it('Skal ikke godta bruker@nav.no.no', () => {
        const epostTest = 'bruker@nav.no.no';
        const action = loggInn(epostTest);
        expect(action.type).to.be.equal(EPOST_UGYLDIG);
    });
});
