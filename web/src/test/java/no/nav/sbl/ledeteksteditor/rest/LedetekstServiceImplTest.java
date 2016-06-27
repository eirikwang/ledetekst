package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static org.junit.Assert.*;

public class LedetekstServiceImplTest {

    @Before
    public void setUp(){

    }

    @Test
    public void testHentAlleTekster() throws GitAPIException, IOException {
        String stashurl = "ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git";
        String fileDir = "Documents/testMappe";
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        List<no.nav.sbl.ledeteksteditor.domain.Ledetekst> ledetekster = ledetekstService.hentAlleTeksterFor(stashurl, fileDir);
        assertFalse(ledetekster.isEmpty());
    }

}