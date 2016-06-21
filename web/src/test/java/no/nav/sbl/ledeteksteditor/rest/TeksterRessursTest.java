package no.nav.sbl.ledeteksteditor.rest;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class TeksterRessursTest {


    @Test
    public void skalReturnereMockData() throws Exception {
        TeksterRessurs ressurs = new TeksterRessurs();
        assertThat(ressurs.test()).containsKeys("key1", "key2", "key3");
    }
}
