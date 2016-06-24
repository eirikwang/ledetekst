package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TeksterRessursTest {
    public static final String TEST_REPO = "ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git";

    private TeksterRessurs teksterRessurs;
    private LedetekstService ledetekstServiceMock;


    @Before
    public void setup() {
        ledetekstServiceMock = mock(LedetekstService.class);
        teksterRessurs = new TeksterRessurs(ledetekstServiceMock);
    }

    @After
    public void teardown() {
        ledetekstServiceMock = null;
        teksterRessurs = null;
    }


    @Test
    public void skalReturnereMockData() throws Exception {
        when(ledetekstServiceMock.hentAlleTeksterFor(anyString(), any(File.class))).thenReturn(asList(
                new Ledetekst("ledetekst1", lagMockLedetekstMap())
        ));


        ArrayList<HashMap> result = (ArrayList<HashMap>) teksterRessurs.hentTeksterForUrl(TEST_REPO).getEntity();
        List<String> nokler = result.stream().map((Map m) -> ((String) m.get("nokkel"))).collect(toList());
        List<Map> spraak = result.stream().map((Map m) -> ((Map) m.get("spraak"))).collect(toList());


        assertEquals(nokler.get(0), "ledetekst1");
        assertThat(spraak.get(0)).hasSize(2);
    }

    @Test
    public void skalReturnereTomListe() throws Exception {
        when(ledetekstServiceMock.hentAlleTeksterFor(anyString(), any(File.class))).thenReturn(emptyList());

        ArrayList<HashMap> result = (ArrayList<HashMap>) teksterRessurs.hentTeksterForUrl(TEST_REPO).getEntity();
        List<String> nokler = result.stream().map((Map m) -> ((String) m.get("nokkel"))).collect(toList());
        List<Map> spraak = result.stream().map((Map m) -> ((Map) m.get("spraak"))).collect(toList());

        assertTrue(nokler.isEmpty());
        assertTrue(spraak.isEmpty());
    }

    @Test
    public void skalReturnereFeilmeldingVedException() throws Exception {
        when(ledetekstServiceMock.hentAlleTeksterFor(anyString(), any(File.class))).thenThrow(new RuntimeException("oops"));

        Response response = teksterRessurs.hentTeksterForUrl(TEST_REPO);

        assertThat(response.getStatus()).isEqualTo(503);
    }

    private Map<String, String> lagMockLedetekstMap() {
        return new HashMap<String, String>(){{
            put("nb", "på norsk");
            put("en", "på engelsk");
        }};
    }
}
