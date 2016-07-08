package no.nav.sbl.ledeteksteditor.rest.ressurser;

import io.swagger.annotations.Api;
import no.nav.sbl.ledeteksteditor.domain.Applikasjon;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import no.nav.sbl.ledeteksteditor.utils.exception.UautentisertException;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.Arrays;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl.REPOSITORIES;

@Path("/applikasjoner")
@Consumes(APPLICATION_JSON + ";charset=utf-8")
@Produces(APPLICATION_JSON + ";charset=utf-8")
@Api(value = "applikasjoner", description = "Operasjoner for å hente ut applikasjoner det er mulig å redigere")
public class ApplikasjonerRessurs {

    @GET
    public Response hentApplikasjoner() {
        return Response.ok(REPOSITORIES.values()).build();
    }
}
