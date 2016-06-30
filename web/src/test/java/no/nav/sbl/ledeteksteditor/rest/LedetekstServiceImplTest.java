package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.GitHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.io.File;
import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class LedetekstServiceImplTest {
    private String localUrl;
    private static final File fileDir = new File("../../test/repo/ledertekst-temp/");

    @Mock
    private LedetekstService ledetekstServiceMock;

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
        List<Ledetekst> ledetekster = ledetekstService.hentAlleLedeteksterFor(localUrl, fileDir);
        assertFalse(ledetekster.isEmpty());
    }

    @Test
    public void testHentLedeteksterReturnererTomList(){
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        String testRepoName = GitHelper.createTomtTestRepo();
        String testRepoCloneName = "../../test/empyTest";
        List<File> filer = ledetekstService.hentAlleLedetekstFilerFor(testRepoName, new File(testRepoCloneName));
        assertTrue(filer.isEmpty());
        GitHelper.removeTestRepo(testRepoName);
        GitHelper.removeTestRepo(testRepoCloneName);
    }
}