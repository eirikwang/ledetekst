package no.nav.sbl.ledeteksteditor.rest;


import io.swagger.annotations.Api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.HashMap;
import java.util.Map;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Api(value = "ledetekster", description = "Endpoint for ledetekster")
@Path("/tekster")
@Produces(APPLICATION_JSON + ";charset=utf-8")
public class TeksterRessurs {

    @GET
    public Map<String, String> test() {
        return new HashMap<String, String>() {{
            put("key1", "text1");
            put("key2", "text2");
            put("key3", "text3");
        }};
    }
}
