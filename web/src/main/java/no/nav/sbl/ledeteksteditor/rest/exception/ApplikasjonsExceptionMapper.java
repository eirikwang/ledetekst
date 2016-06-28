package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ApplikasjonsExceptionMapper implements ExceptionMapper<ApplikasjonsException> {
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);

    @Override
    public Response toResponse(ApplikasjonsException e) {
        LOG.error("Intern server feil", e);
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
