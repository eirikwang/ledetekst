package no.nav.sbl.ledeteksteditor.rest.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.NotAllowedException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;


@Provider
public class NotAllowedExceptionMapper implements ExceptionMapper<NotAllowedException> {
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);

    @Override
    public Response toResponse(NotAllowedException e) {
        LOG.error("Klarte ikke mappe json til forventet input object", e);
        return Response.ok((e.getMessage())).status(Response.Status.METHOD_NOT_ALLOWED).build();
    }
}

