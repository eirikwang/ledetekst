package no.nav.sbl.ledeteksteditor.rest;

import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import no.nav.sbl.ledeteksteditor.config.JacksonConfig;
import org.glassfish.jersey.server.ResourceConfig;

public class Application extends ResourceConfig {

    public Application() {
        register(JacksonConfig.class);
        packages("no.nav.sbl.ledeteksteditor.rest");
        register(JacksonJaxbJsonProvider.class);
    }
}
