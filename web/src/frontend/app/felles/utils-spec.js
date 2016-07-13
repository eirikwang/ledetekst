/* eslint-env mocha */
import { expect } from './../../test-helper';
import { hentNavnFraEpost, storForbokstavPaaHvertOrd, hentLedetekstIndex, erGyldigEpost, filtrerListe } from './utils';

describe('Sjekker hentNavnFraEpost', () => {
    it('Hente ut riktig navn fra epost, ola.nordmann@nav.no', () => {
        const navn = hentNavnFraEpost('ola.nordmann@nav.no');
        expect(navn).to.be.equal('ola nordmann');
    });

    it('Hente ut navn for folk med mellomnavn', () => {
        const navn = hentNavnFraEpost('ola.nord.mann@nav.no');
        expect(navn).to.be.equal('ola nord mann');
    });

    it('Skal hente ut navn fra epost med tall, ola2.normann@nav.no.no', () => {
        const navn = hentNavnFraEpost('ola2.normann@nav.no');
        expect(navn).to.be.equals('ola normann');
    });

    it('Skal hente ut navn fra epost med tall, o2la.3nordmann@nav.no.no', () => {
        const navn = hentNavnFraEpost('o2la.3nordmann@nav.no');
        expect(navn).to.be.equals('ola nordmann');
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

describe('Sjekker erGyldigEpost', () => {
    // Skal IKKE godta
    it('Skal ikke godta spesialtegn i navn: bru#ker@nav.no', () => {
        const epostTest = 'bru#ker@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(false);
    });
    it('Skal ikke godta andre tegn mellom "nav" og "no" enn punktum: bruker@nav#no', () => {
        const epostTest = 'bruker@nav#no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(false);
    });
    it('Skal ikke godta bruker@nav..no', () => {
        const epostTest = 'bruker@nav..no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(false);
    });
    it('Skal ikke godta bru..ker@nav.no', () => {
        const epostTest = 'bru..ker@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(false);
    });
    it('Skal ikke godta @nav.no', () => {
        const epostTest = '@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(false);
    });
    // Skal godta
    it('Skal godta tall i navn: bruk3r@nav.no', () => {
        const epostTest = 'bruk3r@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(true);
    });
    it('Skal godta enkeltnavn: bruker@nav.no', () => {
        const epostTest = 'bruker@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(true);
    });
    it('Skal godta to navn: bruk.er@nav.no', () => {
        const epostTest = 'bruk.er@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(true);
    });
    it('Skal godta 3 navn: br.uk.er@nav.no', () => {
        const epostTest = 'br.uk.er@nav.no';
        const erGyldig = erGyldigEpost(epostTest);
        expect(erGyldig).to.be.equal(true);
    });
});

describe('Sjekker filtrering av liste', () => {
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
    });

    it('Teste søkestreng med uppercase', () => {
        const tekster = { data: [
            { nokkel: 'test1' },
            { nokkel: 'test2' },
            { nokkel: 'loremipsum' }
        ] };
        const search = 'TEST';
        const filtrertListe = filtrerListe(tekster, search);
        expect(filtrertListe.data.length).to.be.equal(2);
    });

    it('Teste nøkkel med uppercase', () => {
        const tekster = { data: [
            { nokkel: 'TEST1' },
            { nokkel: 'test2' },
            { nokkel: 'loremipsum' }
        ] };
        const search = 'test';
        const filtrertListe = filtrerListe(tekster, search);
        expect(filtrertListe.data.length).to.be.equal(2);
    });
});
