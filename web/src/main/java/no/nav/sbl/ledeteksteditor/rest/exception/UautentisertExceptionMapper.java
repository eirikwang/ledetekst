package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.UautentisertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;


@Provider
public class UautentisertExceptionMapper implements ExceptionMapper<UautentisertException> {
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);

    @Override
    public Response toResponse(UautentisertException e) {
        LOG.error("Manglende header informasjon: ", e);
        return Response.ok((e.getMessage())).status(Response.Status.UNAUTHORIZED).build();
    }
}
