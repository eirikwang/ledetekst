package no.nav.sbl.ledeteksteditor.rest;

import io.swagger.annotations.Api;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
@Api(value = "ledetekster", description = "Endpoint for ledetekster")
public class TeksterRessurs {

    private static Logger logger = LoggerFactory.getLogger(TeksterRessurs.class);

    @Inject
    private LedetekstService ledetekstService;

    @GET
    @Path("/{stashurl}")
    public Response hentTeksterForUrl(@PathParam("stashurl") String stashUrl) {
        List<Ledetekst> applikasjonsTekster = ledetekstService.hentAlleTeksterFor(
                LedetekstServiceImpl.REPOSITORIES.get(stashUrl),
                getRepoDir(stashUrl));
        ArrayList<HashMap> toReturn = new ArrayList<>();
        for (Ledetekst l : applikasjonsTekster) {
            HashMap<String, Object> tekstMap = new HashMap<>();
            tekstMap.put("nokkel", l.hentNavn());
            tekstMap.put("spraak", l.hentInnhold());
            toReturn.add(tekstMap);
        }
        return Response.ok(toReturn).build();
    }

    private File getRepoDir(String reponavn) {
        String datadir = System.getProperty("dirs.repos", "../");
        return new File(datadir).toPath().resolve(reponavn).toFile();
    }
}
