/* eslint-env mocha */
import { expect } from './../../test-helper';
import { LOGG_INN, InnloggingsStatus } from './logginn-actions';
import loggInn from './logginn-reducer';

describe('Innlogging Reducer', () => {
    it('Skal godta bruker@nav.no', () => {
        const emailTest = 'bruker@nav.no';
        const action = { type: LOGG_INN, data: { navn: '', email: emailTest } };
        const state = loggInn({}, action);

        expect(state.status).to.be.equal(InnloggingsStatus.LOGGET_INN);
    });

    it('Skal ikke godta bruker@nav.no.no', () => {
        const emailTest = 'bruker@nav.no.no';
        const action = { type: LOGG_INN, data: { navn: '', email: emailTest } };
        const state = loggInn(undefined, action);
        expect(state.status).to.be.equal(InnloggingsStatus.LOGGET_UT);
    });
});
