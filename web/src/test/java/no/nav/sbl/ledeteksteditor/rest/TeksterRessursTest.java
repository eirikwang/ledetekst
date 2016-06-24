package no.nav.sbl.ledeteksteditor.rest;

import org.junit.Test;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

public class TeksterRessursTest {

    @Test
    public void skalReturnereMockData() throws Exception {
        TeksterRessurs ressurs = new TeksterRessurs();
        ArrayList<HashMap> result = (ArrayList<HashMap>) ressurs.testTekstHenting().getEntity();
        List<String> nokler = result.stream().map((Map m) -> ((String) m.get("nokkel"))).collect(toList());
        List<Map> spraak = result.stream().map((Map m) -> ((Map) m.get("spraak"))).collect(toList());
        System.out.println(nokler.get(0));
        assertEquals(nokler.get(0), "situasjoner-page.ung-og-uten-erfaring-lenketekst");
        assertThat(spraak.get(0)).hasSize(2);
    }
}
