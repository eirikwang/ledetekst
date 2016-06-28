package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class ApplikasjonsExceptionMapperTest {
    @Test
    public void skalReturnereInternServerError() {
        Response response = new ApplikasjonsExceptionMapper().toResponse(new ApplikasjonsException("Test"));
        assertThat(response.getStatus()).isEqualTo(500);
    }
}
