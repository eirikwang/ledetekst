package no.nav.sbl.ledeteksteditor.rest;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/test")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TestRessurs {
    @GET
    public String test() {
        return "test ressurs";
    }
}
