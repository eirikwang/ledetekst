package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import no.nav.sbl.ledeteksteditor.utils.exception.RemoteIkkeFunnetException;
import org.eclipse.jgit.lib.Repository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;


public class GitWrapperTest {

    @Before
    public void setUp(){
    }

    @After
    public void tearDown(){
    }

    @Test(expected = RemoteIkkeFunnetException.class)
    public void teestGetRepokasterUnntakVedUgyldigRemote() {
        Repository repo = GitWrapper.getRepo(null, new File("../../invalid_remote_test"));
        GitWrapper.pull(repo);
    }

    @Test(expected = ApplikasjonsException.class)
    public void testKasterUnntakVedProblemerMedAaPushe() {
        Repository repo = GitWrapper.getRepo(null, new File("../../invalid_remote_test"));
        GitWrapper.pull(repo);
    }
}