package no.nav.sbl.ledeteksteditor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        EnvironmentPropertiesConfig.class
})
public class ApplicationConfig {
}
