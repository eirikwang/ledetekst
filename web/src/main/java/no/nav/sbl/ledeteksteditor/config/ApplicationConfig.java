package no.nav.sbl.ledeteksteditor.config;

import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import no.nav.sbl.ledeteksteditor.services.LedetekstServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        EnvironmentPropertiesConfig.class
})
public class ApplicationConfig {

    @Bean
    public String dummy() {
        return "dummy-tekst";
    }

    @Bean
    public LedetekstService ledetekstService() {
        return new LedetekstServiceImpl();
    }
}
