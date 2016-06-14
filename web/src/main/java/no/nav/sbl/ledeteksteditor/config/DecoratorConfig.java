package no.nav.sbl.ledeteksteditor.config;

import no.nav.innholdshenter.common.SimpleEnonicClient;
import no.nav.innholdshenter.filter.DecoratorFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

@Configuration
public class DecoratorConfig {
    private static final String FRAGMENTS_URL = "common-html/v3/navno";
    private static final String APPLICATION_NAME = "ledeteksteditor";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList("./rest/.*", ".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES = new ArrayList<>(asList("webstats-ga-notrack", "header", "footer-withmenu", "styles", "scripts", "skiplinks"));

    @Inject
    private SimpleEnonicClient enonicClient;

    @Bean
    public DecoratorFilter decoratorFilter() {
        DecoratorFilter decoratorFilter = new DecoratorFilter();
        decoratorFilter.setFragmentsUrl(FRAGMENTS_URL);
        decoratorFilter.setContentRetriever(enonicClient);
        decoratorFilter.setApplicationName(APPLICATION_NAME);
        decoratorFilter.setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        decoratorFilter.setFragmentNames(FRAGMENT_NAMES);
        return decoratorFilter;
    }
}
