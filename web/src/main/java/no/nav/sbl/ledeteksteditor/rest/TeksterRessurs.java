package no.nav.sbl.ledeteksteditor.rest;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TeksterRessurs {

    @GET
    public Response testTekstHenting() {
        JGitWrapper gitTest = new JGitWrapper();
        try {
            gitTest.cloneRepository();
            ArrayList<Ledetekst> applikasjonsTekster = gitTest.hentApplikasjonsLedetekster();
            ArrayList<HashMap> toReturn = new ArrayList<>();
            for (Ledetekst l : applikasjonsTekster) {
                HashMap<String, Object> tekstMap = new HashMap<>();
                tekstMap.put("nokkel", l.hentNavn());
                tekstMap.put("spraak", l.hentInnhold());
                toReturn.add(tekstMap);
            }
            return Response.ok(toReturn).build();
        } catch (Exception e) {
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).build();
        }
    }
}

