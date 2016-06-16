package no.nav.sbl.ledeteksteditor.rest;


import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/test")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TestRessurs {

    @Autowired
    public String dummy;

    @GET
    public String test() {
        return "test ressurs: " + dummy;
    }
}
