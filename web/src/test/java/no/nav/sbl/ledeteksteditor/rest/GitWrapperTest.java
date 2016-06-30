package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.RemoteIkkeFunnetException;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.io.File;

public class GitWrapperTest {

    @Mock
    private Git jGitMoc;

    @Before
    public void setUp(){
    }

    @After
    public void tearDown(){
    }

    @Test(expected = RemoteIkkeFunnetException.class)
    public void kasterUnntakVedUgyldigRemote() {
        Repository repo = GitWrapper.getRepo(null, new File("../../invalid_remote_test"));
        GitWrapper.pull(repo);
    }
}