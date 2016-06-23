package no.nav.sbl.ledeteksteditor.rest;

import org.eclipse.jgit.api.errors.GitAPIException;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static org.junit.Assert.*;

public class LedetekstRessursTest {

    @Before
    public void setUp(){

    }

    @Test
    public void testHentAlleTekster() throws GitAPIException, IOException {
        String stashurl = "ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git";
        File fileDir = new File("../repo/veiledningarbeidssoker/");
        LedetekstRessurs ledetekstRessurs = new LedetekstRessurs();
        List<no.nav.sbl.ledeteksteditor.domain.Ledetekst> ledetekster = ledetekstRessurs.hentAlleTeksterFor(stashurl, fileDir);
        assertFalse(ledetekster.isEmpty());
    }

}