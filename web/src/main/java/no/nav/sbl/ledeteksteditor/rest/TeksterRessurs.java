package no.nav.sbl.ledeteksteditor.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;


@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TeksterRessurs {

    private HashMap<String, Object> tilLedetekstMap(String nokkel, String no, String en){
        return new HashMap<String, Object>() {{
            put("nokkel", nokkel);
            put("spraak", new HashMap<String, String>() {{
                put("nb", no);
                put("en", en);
            }});
        }};
    }

    @GET
    public List<Map> test() {
        return new ArrayList<Map>() {{
            tilLedetekstMap("dagpenger.annenstotte.ingress",
                    "Som arbeidssøker kan du få støtte til å dekke utgifter for å komme i arbeid",
                    "[EN] Som arbeidssøker kan du få støtte til å dekke utgifter for å komme i arbeid");
            tilLedetekstMap("dagpenger.annenstotte.innhold",
                    "<p>Du kan få støtte til å dekke utgifter for å reise til jobbintervju eller til arbeidsstedet når du starter i en  jland.",
                    "<p>[EN] Som arbeidssøker kan du få støtte til å dekke utgifter for å komme i arbeid:</p><ul class=\"mindre-innrykk-liste\">");
            tilLedetekstMap("dagpenger.annenstotte.sok-stonad-lenke",
                    "https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Tilleggsstonader/Tilleggsstonader/Innsendingsvalg-tilleggsstonader",
                    "https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Tilleggsstonader/Tilleggsstonader/Innsendingsvalg-tilleggsstonader");
        }};
    }
}
