package no.nav.sbl.ledeteksteditor.rest;

import org.assertj.core.api.Condition;
import org.assertj.core.api.MapAssert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;

public class TeksterRessursTest {


    @Test
    public void skalReturnereMockData() throws Exception {
        TeksterRessurs ressurs = new TeksterRessurs();
        List<Map> result = ressurs.test();
        List<String> nokkler = result.stream().map((Map m) -> ((String) m.get("nokkel"))).collect(toList());
        List<Map> spraak = result.stream().map((Map m) -> ((Map) m.get("spraak"))).collect(toList());

        assertThat(nokkler)
                .containsExactly("dagpenger.annenstotte.ingress", "dagpenger.annenstotte.innhold", "dagpenger.annenstotte.sok-stonad-lenke");
        assertThat(spraak.get(0)).hasSize(2);
    }
}
