/* eslint-env mocha */
import { expect } from './../../test-helper';
import reducer from './applikasjoner-reducer';
import { motattApplikasjoner } from './applikasjoner-actions';

describe('Reducer for Applikasjoner-komponent', () => {
    it('Skal ha riktig initial state', () => {
        expect(reducer(undefined, {}).status).to.be.equal('ikkelastet');
    });

    it('Skal oppdatere staten riktig ved oppdater', () => {
        const action = motattApplikasjoner([{ id: 'app1', navn: 'app1navn' }, { id: 'app2', navn: 'app2navn' }]);
        expect(reducer({}, action)).to.be.eql({
            status: 'lastet',
            data: [{ id: 'app1', navn: 'app1navn' }, { id: 'app2', navn: 'app2navn' }]
        });
    });
});
