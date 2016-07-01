package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.GitHelper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.List;

import static org.junit.Assert.*;

public class LedetekstServiceImplTest {
    private String localUrlTestRepo;
    private String localUrlTomtTestRepo;
    private static final File fileDirTestRepo = new File("../../test/repo/ledertekst-temp/");
    private static final File fileDirTomtTestRepo = new File("../../test/repo/ledertekst-temp-tomt/");

    @Before
    public void setUp(){
        localUrlTestRepo = GitHelper.createTestRepo();
        localUrlTomtTestRepo = GitHelper.createTomtTestRepo();
    }

    @After
    public void tearDown(){
        GitHelper.removeTestRepo(localUrlTestRepo);
        GitHelper.removeTestRepo(localUrlTomtTestRepo);
        GitHelper.removeTestRepo(fileDirTestRepo.getPath());
        GitHelper.removeTestRepo(fileDirTomtTestRepo.getPath());
        localUrlTestRepo = null;
        localUrlTomtTestRepo = null;
    }

    @Test
    public void testHentAlleTekster() {
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        List<Ledetekst> ledetekster = ledetekstService.hentAlleLedeteksterFor(localUrlTestRepo, fileDirTestRepo);
        assertFalse(ledetekster.isEmpty());
    }

    @Test
    public void testHentLedeteksterReturnererTomList(){
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();

        List<File> filer = ledetekstService.hentAlleLedetekstFilerFor(localUrlTomtTestRepo, fileDirTomtTestRepo);
        assertTrue(filer.isEmpty());
    }

    @Test( expected = IkkeFunnetException.class)
    public void testHentLedeteksteForReturnererIkkeFunnet(){
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        ledetekstService.hentLedeteksteFor(localUrlTomtTestRepo, fileDirTomtTestRepo, "prop1");
    }

    @Test
    public void testHentLedeteksteForReturnererLedetekst(){
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        Ledetekst ledetekst = ledetekstService.hentLedeteksteFor(localUrlTestRepo, fileDirTestRepo, "prop1");
        assertNotEquals(ledetekst, null);
        assertEquals(ledetekst.nokkel, "prop1");
        assertEquals(ledetekst.spraak.get("no"), "test data prop1 no");
        assertEquals(ledetekst.spraak.get("en"), "test data prop1 en");
    }
}