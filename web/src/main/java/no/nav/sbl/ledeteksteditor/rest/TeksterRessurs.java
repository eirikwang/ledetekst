package no.nav.sbl.ledeteksteditor.rest;

import io.swagger.annotations.Api;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.domain.Payload;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Consumes(APPLICATION_JSON + ";charset=utf-8")
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
        ArrayList<Map> toReturn = new ArrayList<>();
        for (Ledetekst l : applikasjonsTekster) {
            toReturn.add(l.toMap());
        }
        return Response.ok(toReturn).build();
    }

    @PUT
    @Path("/{stashurl}/{ledetekstnokkel}")
    public Response oppdaterLedetekst(Payload payload, @PathParam("stashurl") String stashUrl, @PathParam("ledetekstnokkel") String ledetekstnokkel){
        return  Response.ok(payload.getData()).build();
    }

    @GET
    @Path("/{stashurl}/{ledetekstnokkel}")
    public Response hentLedetekst(@PathParam("stashurl") String stashUrl, @PathParam("ledetekstnokkel") String ledetekstnokkel){
        List<Ledetekst> applikasjonsTekster = ledetekstService.hentAlleTeksterFor(
                LedetekstServiceImpl.REPOSITORIES.get(stashUrl),
                getRepoDir(stashUrl));
        for (Ledetekst l : applikasjonsTekster) {
            if(l.hentNavn().equals(ledetekstnokkel)){
                return Response.ok(l.toMap()).build();
            }
        }
        return Response.ok("Fant ikke noe").build();
    }

    private File getRepoDir(String reponavn) {
        String datadir = System.getProperty("dirs.repos", "../");
        return new File(datadir).toPath().resolve(reponavn).toFile();
    }
}
