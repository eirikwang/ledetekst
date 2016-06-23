package no.nav.sbl.ledeteksteditor;

import no.nav.sbl.ledeteksteditor.utils.JGitWrapper;

import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class StartJetty {
    public static void main(String[] args) throws Exception {

        /*
        File overrideWebXml = new File(TEST_RESOURCES, "override-web.xml");

        Jetty jetty = usingWar()
                .at("ledeteksteditor")
                .port(8182)
                .overrideWebXml(overrideWebXml)
                .loadProperties("/environment-test.properties")
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
        */
        JGitWrapper kloneTest = new JGitWrapper();
        kloneTest.cloneRepository();

    }
}
