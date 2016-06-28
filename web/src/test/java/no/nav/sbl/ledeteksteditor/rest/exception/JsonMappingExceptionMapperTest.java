package no.nav.sbl.ledeteksteditor.rest.exception;

import com.fasterxml.jackson.databind.JsonMappingException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class JsonMappingExceptionMapperTest {
    @Test
    public void skalReturnereInternServerError() {
        Response response = new JsonMappingExceptionMapper().toResponse(new JsonMappingException(null, "Test"));
        assertThat(response.getStatus()).isEqualTo(400);
    }
}
