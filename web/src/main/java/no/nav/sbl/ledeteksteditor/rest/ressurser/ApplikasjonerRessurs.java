package no.nav.sbl.ledeteksteditor.rest.ressurser;

import io.swagger.annotations.Api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

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
