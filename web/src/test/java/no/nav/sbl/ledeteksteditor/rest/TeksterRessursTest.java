package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Applikasjon;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.rest.ressurser.TeksterRessurs;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.runners.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;

import javax.ws.rs.core.Response;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TeksterRessursTest {
    public static final String TEST_REPO = "sbl-veiledningarbeidssoker";
    private static final String TEST_LEDETEKSTNOKKEL = "prop1";

    @Mock
    private LedetekstService ledetekstServiceMock;

    @InjectMocks
    private TeksterRessurs teksterRessurs;

    @Test
    public void teksterSkalReturnereMockData() {
        when(ledetekstServiceMock.hentAlleLedeteksterFor(any(Applikasjon.class), any(File.class))).thenReturn(asList(
                new Ledetekst("ledetekst1", lagMockLedetekstMap())
        ));


        List<Ledetekst> result = (List<Ledetekst>) teksterRessurs.hentTeksterForUrl(TEST_REPO).getEntity();
        List<String> nokler = result.stream().map(l -> l.nokkel).collect(toList());
        List<Map> spraak = result.stream().map(l -> l.spraak).collect(toList());

        assertFalse(result.isEmpty());
        assertEquals(nokler.get(0), "ledetekst1");
        assertThat(spraak.get(0)).hasSize(2);
    }

    @Test
    public void teksterSkalReturnereTomListe() {
        when(ledetekstServiceMock.hentAlleLedeteksterFor(any(Applikasjon.class), any(File.class))).thenReturn(emptyList());

        List<Ledetekst> result = (List<Ledetekst>) teksterRessurs.hentTeksterForUrl(TEST_REPO).getEntity();
        List<String> nokler = result.stream().map(l -> l.nokkel).collect(toList());
        List<Map> spraak = result.stream().map(l -> l.spraak).collect(toList());

        assertTrue(result.isEmpty());
        assertTrue(nokler.isEmpty());
        assertTrue(spraak.isEmpty());
    }

    @Test(expected = IkkeFunnetException.class)
    public void tekstSkalReturnereIkkeFunnet(){
        when(ledetekstServiceMock.hentLedeteksteFor(any(Applikasjon.class), any(File.class), anyString())).thenThrow(new IkkeFunnetException("Fant ikke"));
        Response response = teksterRessurs.hentLedetekst(TEST_REPO, TEST_LEDETEKSTNOKKEL);
    }

    @Test
    public void testSkalReturnereLedetekst(){
        when(ledetekstServiceMock.hentLedeteksteFor(any(Applikasjon.class), any(File.class), anyString())).thenReturn(new Ledetekst("prop1", new HashMap<String, String>(){{
            put("en", "en");
            put("no", "no");
        }}));
        Ledetekst ledetekst = (Ledetekst)teksterRessurs.hentLedetekst(TEST_REPO, TEST_LEDETEKSTNOKKEL).getEntity();
        assertFalse(ledetekst == null);
        assertEquals(ledetekst.nokkel, "prop1");
        assertEquals(ledetekst.spraak.get("en"), "en");
        assertEquals(ledetekst.spraak.get("no"), "no");
    }

    @Test
    public void tekstSkalReturnereOppdatertLedetekst(){
        when(ledetekstServiceMock.oppdaterLedeteksteFor(any(Applikasjon.class), any(File.class), any(Ledetekst.class), any(Ident.class))).thenAnswer(new Answer<Ledetekst>() {
            @Override
            public Ledetekst answer(InvocationOnMock invocationOnMock) throws Throwable {
                return (Ledetekst) invocationOnMock.getArguments()[2];
            }
        });

        Ledetekst ledetekst = (Ledetekst) teksterRessurs.oppdaterLedetekst(new Ledetekst("prop1", new HashMap<String, String>(){{
                put("en", "en");
                put("no", "no");
        }}), "Test Bruker", "test.bruker@nav.no", "test-repo").getEntity();

        assertFalse(ledetekst == null);
        assertEquals(ledetekst.nokkel, "prop1");
        assertEquals(ledetekst.spraak.get("en"), "en");
        assertEquals(ledetekst.spraak.get("no"), "no");
    }

    private Map<String, String> lagMockLedetekstMap() {
        return new HashMap<String, String>() {{
            put("nb", "på norsk");
            put("en", "på engelsk");
        }};
    }
}
