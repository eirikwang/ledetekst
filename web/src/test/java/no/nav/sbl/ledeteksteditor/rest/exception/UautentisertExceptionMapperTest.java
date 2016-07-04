package no.nav.sbl.ledeteksteditor.rest.exception;

import no.nav.sbl.ledeteksteditor.utils.exception.UautentisertException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class UautentisertExceptionMapperTest {
    @Test
    public void skalReturnereUautentisertError() {
        Response response = new UautentisertExceptionMapper().toResponse(new UautentisertException("Uautentisert"));
        assertThat(response.getStatus()).isEqualTo(401);
    }
}
