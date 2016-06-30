package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.utils.GitHelper;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import no.nav.sbl.ledeteksteditor.utils.exception.RemoteIkkeFunnetException;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.io.File;
import java.io.IOException;

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

    @Test(expected = ApplikasjonsException.class)
    public void kasterUnntakVedProblemerMedAAPushe() throws IOException {
        String repoName = GitHelper.createTestRepo();
        GitWrapper.push(Git.open(new File(repoName)).getRepository());
    }
}