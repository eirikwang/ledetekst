package no.nav.sbl.ledeteksteditor.rest.exception;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertTrue;

@RunWith(MockitoJUnitRunner.class)
public class ThrowableMapperTest {
    @Test
    public void skalReturnereServerError() {
        Response response = new ThrowableMapper().toResponse(new Throwable("Test"));
        assertTrue( response.getHeaderString(ThrowableMapper.NO_BIGIP_5XX_REDIRECT).equals("true"));
    }
}
