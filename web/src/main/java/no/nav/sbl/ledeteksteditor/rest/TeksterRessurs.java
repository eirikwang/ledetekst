package no.nav.sbl.ledeteksteditor.rest;


import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static java.lang.String.format;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TeksterRessurs {
    private static Logger logger = LoggerFactory.getLogger(TeksterRessurs.class);
    public static final File REPO_DIR = new File("../repo/veiledningarbeidssoker/");

    @Inject
    private LedetekstService ledetekstService;

    @GET
    @Path("/{stashurl}")
    public Response hentTeksterForUrl(@PathParam("stashurl") String stashUrl) {
        try {
            List<Ledetekst> applikasjonsTekster = ledetekstService.hentAlleTeksterFor(stashUrl, REPO_DIR);
            ArrayList<HashMap> toReturn = new ArrayList<>();
            for (Ledetekst l : applikasjonsTekster) {
                HashMap<String, Object> tekstMap = new HashMap<>();
                tekstMap.put("nokkel", l.hentNavn());
                tekstMap.put("spraak", l.hentInnhold());
                toReturn.add(tekstMap);
            }
            return Response.ok(toReturn).build();
        } catch (Exception e) {
            logger.warn(format("Kunne ikke hente ut tekster for %s", stashUrl), e);
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).build();
        }
    }
}

