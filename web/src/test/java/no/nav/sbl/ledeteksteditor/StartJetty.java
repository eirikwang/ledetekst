package no.nav.sbl.ledeteksteditor;

import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.sbl.ledeteksteditor.rest.JGitWrapper;

import java.io.File;

import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.test.path.FilesAndDirs.TEST_RESOURCES;

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
