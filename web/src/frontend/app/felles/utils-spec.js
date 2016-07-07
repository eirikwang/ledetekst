/* eslint-env mocha */
import { expect } from './../../test-helper';
import { hentNavnFraEpost, storForbokstavPaaHvertOrd } from './utils';

describe('Sjekker hentNavnFraEpost', () => {
    it('Hente ut riktig navn fra epost, ola.nordmann@nav.no', () => {
        const navn = hentNavnFraEpost('ola.nordmann@nav.no');
        expect(navn).to.be.equal('ola nordmann');
    });

    it('Skal hente ut navn fra epost, bruker@nav.no.no', () => {
        const navn = hentNavnFraEpost('bruker@nav.no');
        expect(navn).to.be.equals('bruker');
    });
});

describe('Sjeker storForbokstavPaaHvertOrd', () => {
    it('Stor forbokstav på hvert ord. Enkel settning. Kun små bokstaver', () => {
        const settning = storForbokstavPaaHvertOrd('stor bokstav på hvert ord');
        expect(settning).to.be.equals('Stor Bokstav På Hvert Ord')
    });
});