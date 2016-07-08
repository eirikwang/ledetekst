package no.nav.sbl.ledeteksteditor.rest.ressurser;

import io.swagger.annotations.Api;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.exception.UautentisertException;
import org.apache.commons.lang3.StringUtils;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.List;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Consumes(APPLICATION_JSON + ";charset=utf-8")
@Produces(APPLICATION_JSON + ";charset=utf-8")
@Api(value = "ledetekster", description = "Endpoint for ledetekster")
public class TeksterRessurs {
    static final Predicate<String> EPOST = Pattern.compile("^([a-zA-Z].+@nav.no)$").asPredicate();

    @Inject
    private LedetekstService ledetekstService;

    @GET
    @Path("/{remoteUrl}")
    public Response hentTeksterForUrl(@PathParam("remoteUrl") String remoteUrl) {
        List<Ledetekst> applikasjonsTekster = ledetekstService.hentAlleLedeteksterFor(
                LedetekstServiceImpl.REPOSITORIES.get(remoteUrl),
                getRepoDir(remoteUrl));

        return Response.ok(applikasjonsTekster).build();
    }

    @PUT
    @Path("/{remoteUrl}/{ledetekstnokkel}")
    public Response oppdaterLedetekst(Ledetekst ledetekst, @HeaderParam("navn") String navn, @HeaderParam("epost") String epost, @PathParam("remoteUrl") String remoteUrl) {
        if (!erAutentisert(navn, epost)) {
            throw new UautentisertException("Navn eller epost mangler fra request header");
        }

        Ident ident = new Ident(navn, epost);
        Ledetekst oppdatertLedetekst = ledetekstService.oppdaterLedeteksteFor(
                LedetekstServiceImpl.REPOSITORIES.get(remoteUrl),
                getRepoDir(remoteUrl), ledetekst, ident);
        return Response.ok(oppdatertLedetekst).build();
    }

    private boolean erAutentisert(String navn, String epost) {
        if (erBlank(navn) || erBlank(epost) || !erGyldigEpost(epost)) {
            return false;
        }
        return true;
    }

    private boolean erGyldigEpost(String epost) {
        return EPOST.test(epost);
    }

    private boolean erBlank(String navn) {
        return navn == null || "undefined".equals(navn) || "null".equals(navn) || StringUtils.isBlank(navn);
    }

    @GET
    @Path("/{remoteUrl}/{ledetekstnokkel}")
    public Response hentLedetekst(@PathParam("remoteUrl") String remoteUrl, @PathParam("ledetekstnokkel") String ledetekstnokkel) {
        Ledetekst ledetekst = ledetekstService.hentLedeteksteFor(
                LedetekstServiceImpl.REPOSITORIES.get(remoteUrl),
                getRepoDir(remoteUrl), ledetekstnokkel);
        return Response.ok(ledetekst).build();
    }


    private File getRepoDir(String reponavn) {
        String datadir = System.getProperty("dirs.repos", "../");
        return new File(datadir).toPath().resolve(reponavn).toFile();
    }
}
