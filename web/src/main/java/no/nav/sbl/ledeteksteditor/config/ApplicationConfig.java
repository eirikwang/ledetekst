package no.nav.sbl.ledeteksteditor.config;

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
}
