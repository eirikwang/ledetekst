package no.nav.sbl.ledeteksteditor.rest.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.serverError;

@Provider
public class ThrowableMapper implements ExceptionMapper<Exception>{
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);
    static final String NO_BIGIP_5XX_REDIRECT = "X-Escape-5xx-Redirect";

    @Override
    public Response toResponse(Exception exception) {
        LOG.error("Noe uventet feilet", exception);
        return serverError().header(NO_BIGIP_5XX_REDIRECT, true).type(APPLICATION_JSON).build();
    }
}
