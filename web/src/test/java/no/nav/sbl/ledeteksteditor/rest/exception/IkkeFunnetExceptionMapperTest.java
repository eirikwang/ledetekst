package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class IkkeFunnetExceptionMapperTest {
    @Test
    public void skalReturnereInternServerError() {
        Response response = new IkkeFunnetExceptionMapper().toResponse(new IkkeFunnetException("Test"));
        assertThat(response.getStatus()).isEqualTo(404);
    }
}
