package no.nav.sbl.ledeteksteditor.rest.ressurser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class ApplikasjonerRessursTest {
    @InjectMocks
    private ApplikasjonerRessurs applikasjonerRessurs;

    @Test
    public void skalReturnereApplikasjoner(){
        Response response = applikasjonerRessurs.hentApplikasjoner();
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }


}