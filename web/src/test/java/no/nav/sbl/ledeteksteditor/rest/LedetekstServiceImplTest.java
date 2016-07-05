package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Commitable;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.GitHelper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

public class LedetekstServiceImplTest {
    private String localUrlTestRepo;
    private String localUrlTomtTestRepo;
    private static final File fileDirTestRepo = new File(".." + File.separator + ".." + File.separator + "test" + File.separator + "repo" + File.separator + "ledertekst-temp");
    private static final File fileDirTomtTestRepo = new File(".." + File.separator + ".." + File.separator + "test" + File.separator + "repo" + File.separator + "ledertekst-temp-tomt");

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

    @Test( expected = IkkeFunnetException.class )
    public void testOppdaterLedeteksteForReturnererIkkeFunnet(){
        LedetekstService ledetekstService = new LedetekstServiceImpl();
        ledetekstService.oppdaterLedeteksteFor(localUrlTomtTestRepo, fileDirTomtTestRepo, lagDummyCommit(), null);
    }

    @Test
    public void testOppdaterLedeteksteForReturnererOppdatertLedetekst(){
        LedetekstService ledetekstService = new LedetekstServiceImpl();
        Ledetekst ledetekst = ledetekstService.oppdaterLedeteksteFor(localUrlTestRepo, fileDirTestRepo, lagDummyCommit(), new Ident("navn", "epost"));


        assertNotEquals(ledetekst, null);
        assertEquals(ledetekst.nokkel, "prop1");
        assertEquals(ledetekst.spraak.get("no"), "verdi");
        assertEquals(ledetekst.spraak.get("en"), "value");
    }

    private static Commitable<Ledetekst> lagDummyCommit() {
        return new Commitable<Ledetekst>(Optional.of("Kommentar"), new Ledetekst("prop1", new HashMap<String, String>(){{
            put("no", "verdi");
            put("en", "value");
        }}));
    }
}