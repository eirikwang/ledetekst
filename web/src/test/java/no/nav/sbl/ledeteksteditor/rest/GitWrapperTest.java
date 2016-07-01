package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.AapneRepoException;
import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import no.nav.sbl.ledeteksteditor.utils.exception.RemoteIkkeFunnetException;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;

import java.io.File;
import java.io.IOException;

import static org.mockito.Matchers.any;

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
    public void teestGetRepokasterUnntakVedUgyldigRemote() {
        Repository repo = GitWrapper.getRepo(null, new File("../../invalid_remote_test"));
        GitWrapper.pull(repo);
    }

    @Test(expected = ApplikasjonsException.class)
    public void testKasterUnntakVedProblemerMedAaPushe() {
        Repository repo = GitWrapper.getRepo(null, new File("../../invalid_remote_test"));
        GitWrapper.pull(repo);
    }

    @Test(expected = AapneRepoException.class)
    public void testGetRepokasterUnntakVedIOproblemer() throws IOException {
        PowerMockito.when(Git.open(any(File.class))).thenThrow(new IOException("Kunne ikke åpne fil"));
        GitWrapper.getRepo(new File(""));
    }
}