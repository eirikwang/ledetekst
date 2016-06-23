package no.nav.sbl.ledeteksteditor.rest;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TeksterRessurs {

    @GET
    public List<Map> test() {
        JGitWrapper gitTest = new JGitWrapper();

        try {
            ArrayList<Ledetekst> applikasjonsTekster = gitTest.hentApplikasjonsLedetekster();
            List<Map> toReturn = applikasjonsTekster.stream()
                    .map(l -> l.hentInnhold())
                    .collect(Collectors.toList());
            System.out.println("Inne i try -- klar til å returnere!");
            return toReturn;
        }catch(IOException e){
            e.printStackTrace();
        }


        return new ArrayList<Map>() {
            {
                add(new HashMap<String, Object>() {{
                    put("nokkel", "testnokkel1");
                    put("spraak", new HashMap<String, String>() {{
                        put("nb", "Som arbeidssøker kan du få støtte til å dekke utgifter for å komme i arbeid");
                        put("en", "[EN] Som arbeidssøker kan du få støtte til å dekke utgifter for å komme i arbeid");
                    }});
                }});

                add(new HashMap<String, Object>() {{
                    put("nokkel", "testnokkel2");
                    put("spraak", new HashMap<String, String>() {{
                        put("nb", "<p>Du kan få støtte til å dekke utgifter for å reise til jobbintervju eller til arbeidsstedet når du starter i en ny jobb.</p><p>Hvis du flytter fordi du har fått ny jobb, kan du få dekket utgifter til å flytte til et annet sted i Norge eller andre EU/EØS-land.</p><p>Du søker på skjema for tilleggsstønader.</p>");
                        put("en", "<p>[EN] Som arbeidssøker kan du få støtte til å dekke utgifter for å komme i arbeid:</p><ul class=\"mindre-innrykk-liste\"><li>Reise til jobbintervju eller til arbeidsstedet når du starter i en ny jobb.</li><li>Hvis du flytter fordi du har fått ny jobb, kan du få dekket utgifter til flytting til et annet sted i Norge eller andre EU/EØS-land.</li></ul><p class=\"blokk-m\"><a href=\"https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/tilleggsst%C3%B8nader\">Les mer om tilleggsstønader</a></p><p>Hvis du ikke har rett til dagpenger er det spesielt viktig at du greier å redusere hvor mye penger du bruker hver måned. <a href=\"/veiledearbeidssoker/okonomi-oversikt\">Få oversikt over økonomien din</a></p>");
                    }});
                }});

                add(new HashMap<String, Object>() {{
                    put("nokkel", "testnokkel3");
                    put("spraak", new HashMap<String, String>() {{
                        put("nb", "https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Tilleggsstonader/Tilleggsstonader/Innsendingsvalg-tilleggsstonader");
                        put("en", "https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Tilleggsstonader/Tilleggsstonader/Innsendingsvalg-tilleggsstonader");
                    }});
                }});

            }
        };
    }
}

