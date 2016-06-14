package no.nav.sbl.ledeteksteditor.config;

import no.nav.innholdshenter.common.SimpleEnonicClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContentConfig {

    @Value("${appres.cms.url}")
    private String appresBaseUrl;

    @Bean
    public SimpleEnonicClient enonicClient() {
        return new SimpleEnonicClient(appresBaseUrl);
    }
}
