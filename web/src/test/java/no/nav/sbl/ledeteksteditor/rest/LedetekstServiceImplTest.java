package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.GitHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.List;

import static org.junit.Assert.*;

public class LedetekstServiceImplTest {
    private String localUrl;
    private static final File fileDir = new File("../../test/repo/ledertekst-temp/");

    @Before
    public void setUp(){
        localUrl = GitHelper.createTestRepo();
    }

    @After
    public void tearDown(){
        GitHelper.removeTestRepo(localUrl);
        GitHelper.removeTestRepo(fileDir.getPath());
        localUrl = null;
    }

    @Test
    public void testHentAlleTekster() {
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        List<no.nav.sbl.ledeteksteditor.domain.Ledetekst> ledetekster = ledetekstService.hentAlleLedeteksterFor(localUrl, fileDir);
        assertFalse(ledetekster.isEmpty());
    }
}