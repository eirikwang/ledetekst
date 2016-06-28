package no.nav.sbl.ledeteksteditor.rest.exception;

import com.fasterxml.jackson.databind.JsonMappingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;


@Provider
public class JsonMappingExceptionMapper implements ExceptionMapper<JsonMappingException> {
    static final Logger LOG = LoggerFactory.getLogger(ThrowableMapper.class);

    @Override
    public Response toResponse(JsonMappingException e) {
        LOG.error("Klarte ikke mappe json til forventet input object", e);
        //TODO Dette bør nok gjøres på en annen måte. Usikker på hvrodan.
        return Response.ok((e.getMessage())).status(Response.Status.BAD_REQUEST).build();
    }
}

