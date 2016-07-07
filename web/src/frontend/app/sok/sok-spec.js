/* eslint-env mocha */
import { expect } from './../../test-helper';
import sok from './sok-reducer';
import { QUERIED_TEKSTER } from './sok-actions';

describe('Søking', () => {
    it('Sjekk om query i state blir satt riktig', () => {
        const query = 'test-query';
        const state = sok({}, { type: QUERIED_TEKSTER, data: query });
        expect(state.query).to.be.equal(query);
    });
});
