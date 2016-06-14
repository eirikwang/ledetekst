package no.nav.sbl.ledeteksteditor.rest;

import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import org.glassfish.jersey.server.ResourceConfig;

public class Application extends ResourceConfig {

    public Application() {
        packages("no.nav.sbl.ledeteksteditor.rest");
        register(JacksonJaxbJsonProvider.class);
    }
}
