package no.nav.sbl.ledeteksteditor.rest;


import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.exception.GitWrapperInvalidRemoteException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import io.swagger.annotations.Api;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import static java.lang.String.format;

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
        try {
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
        }catch(GitWrapperInvalidRemoteException e){
            return Response.status(Response.Status.NOT_FOUND).build();
        }catch (Exception e) {
            logger.warn(format("Kunne ikke hente ut tekster for %s", stashUrl), e);
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).build();
        }
    }
    private File getRepoDir(String reponavn){
        String datadir = System.getProperty("dirs.repos", "../");
        return new File(datadir).toPath().resolve(reponavn).toFile();
    }
}

