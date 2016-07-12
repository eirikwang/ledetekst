/* eslint-env mocha */
import { expect } from './../../test-helper';
import { hentNavnFraEpost, storForbokstavPaaHvertOrd, hentLedetekstIndex, filtrerListe } from './utils';

describe('Sjekker hentNavnFraEpost', () => {
    it('Hente ut riktig navn fra epost, ola.nordmann@nav.no', () => {
        const navn = hentNavnFraEpost('ola.nordmann@nav.no');
        expect(navn).to.be.equal('ola nordmann');
    });

    it('Hente ut navn for folk med mellomnavn', () => {
        const navn = hentNavnFraEpost('ola.nord.mann@nav.no');
        expect(navn).to.be.equal('ola nord mann');
    });

    it('Skal hente ut navn fra epost, bruker@nav.no.no', () => {
        const navn = hentNavnFraEpost('bruker@nav.no');
        expect(navn).to.be.equals('bruker');
    });
});

describe('Sjeker storForbokstavPaaHvertOrd', () => {
    it('Stor forbokstav på hvert ord. Enkel settning. Kun små bokstaver', () => {
        const settning = storForbokstavPaaHvertOrd('stor bokstav på hvert ord');
        expect(settning).to.be.equals('Stor Bokstav På Hvert Ord');
    });
});

describe('Sjekker hentLedetekstIndex', () => {
    it('Henter ut riktig index for ledetekst 0', () => {
        const tekster = ['Dette', 'er', 'en', 'test'];
        const tekst = tekster[0];
        const index = hentLedetekstIndex(tekster, tekst);
        expect(index).to.be.equal(0);
        expect(index).not.to.be.equal(1);
    });
});

describe.only('Sjekker filtrering av liste', () => {
    it('Filtrere liste med gyldig søkestreng', () => {
        const tekster = { data: [
            { nokkel: 'test1' },
            { nokkel: 'test2' },
            { nokkel: 'loremipsum' }
        ] };
        const search = 'test';
        const filtrertListe = filtrerListe(tekster, search);
        expect(filtrertListe.data.length).to.be.equal(2);
    });

    it('Teste filtrering med udefinert query', () => {
        const tekster = { data: [
            { nokkel: 'test1' },
            { nokkel: 'test2' },
            { nokkel: 'loremipsum' }
        ] };
        const search = undefined;
        const filtrertListe = filtrerListe(tekster, search);
        expect(filtrertListe.data.length).to.be.equal(tekster.data.length);
    })

    it('Teste søkestreng med uppercase', () => {
        const tekster = { data: [
            { nokkel: 'test1' },
            { nokkel: 'test2' },
            { nokkel: 'loremipsum' }
        ] };
        const search = 'TEST';
        const filtrertListe = filtrerListe(tekster, search);
        expect(filtrertListe.data.length).to.be.equal(2);
    })
});
