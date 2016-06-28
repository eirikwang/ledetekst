package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.serverError;

@Provider
public class ApplikasjonsExceptionMapper implements ExceptionMapper<ApplikasjonsException> {
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);
    static final String NO_BIGIP_5XX_REDIRECT = "X-Escape-5xx-Redirect";

    @Override
    public Response toResponse(ApplikasjonsException e) {
        LOG.error("Intern server feil", e);
        return serverError().header(NO_BIGIP_5XX_REDIRECT, true).type(APPLICATION_JSON).build();
    }
}
