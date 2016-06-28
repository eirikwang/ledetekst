package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class IkkeFunnetExceptionMapper implements ExceptionMapper<ApplikasjonsException> {
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);

    @Override
    public Response toResponse(ApplikasjonsException e) {
        LOG.error("Fant ikke ettersport resurs", e);
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
