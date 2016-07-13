package no.nav.sbl.ledeteksteditor.utils;

import org.junit.Test;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

public class BrukerUtilsTest {

    @Test
    public void testErGyldigEpostGirFalseVedSpesialtegnINavn() {
        String epost = "bru#ker@nav.no";
        assertFalse(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirFalseVedSpesialtegnIDomene() {
        String epost = "bruker@nav#no";
        assertFalse(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirFalseVedUgyldigDomene() {
        String epost = "bruker@nav..no";
        assertFalse(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirFalseVedDobbelPunktumINavn() {
        String epost = "bru..ker@nav.no";
        assertFalse(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirFalseVedepostUtenNavn() {
        String epost = "@nav.no";
        assertFalse(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirTrueVedTallINavn() {
        String epost = "bruk3r@nav.no";
        assertTrue(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirTrueVedFlereTallINavn() {
        String epost = "bruk33r@nav.no";
        assertTrue(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirTrueVedEnkeltNavn() {
        String epost = "bruker@nav.no";
        assertTrue(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirTrueVedDobbeltNavn() {
        String epost = "bruk.er@nav.no";
        assertTrue(BrukerUtils.erGyldigEpost(epost));
    }

    @Test
    public void testErGyldigEpostGirTrueVedTrippelNavn() {
        String epost = "br.uk.er@nav.no";
        assertTrue(BrukerUtils.erGyldigEpost(epost));
    }
}
