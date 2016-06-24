package no.nav.sbl.ledeteksteditor.rest;


import no.nav.sbl.ledeteksteditor.domain.Ledetekst;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TeksterRessurs {

    @GET
    public Response testTekstHenting() {

        LedetekstRessurs tekstTest = new LedetekstRessurs();
        try {
            List<Ledetekst> applikasjonsTekster = tekstTest.hentAlleTeksterFor
                    ("ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git", new File("../repo/veiledningarbeidssoker/"));
            ArrayList<HashMap> toReturn = new ArrayList<>();
            for (Ledetekst l : applikasjonsTekster) {
                HashMap<String, Object> tekstMap = new HashMap<>();
                tekstMap.put("nokkel", l.hentNavn());
                tekstMap.put("spraak", l.hentInnhold());
                toReturn.add(tekstMap);
            }
            return Response.ok(toReturn).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).build();
        }
    }
}

