package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.List;

import static org.junit.Assert.*;

public class LedetekstServiceImplTest {

    @Before
    public void setUp(){

    }

    @Test
    public void testHentAlleTekster() {
        String stashurl = "ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git";
        File fileDir = new File("../repo/veiledningarbeidssoker/");
        LedetekstServiceImpl ledetekstService = new LedetekstServiceImpl();
        List<no.nav.sbl.ledeteksteditor.domain.Ledetekst> ledetekster = ledetekstService.hentAlleLedeteksterFor(stashurl, fileDir);
        assertFalse(ledetekster.isEmpty());
    }
}