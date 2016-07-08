package no.nav.sbl.ledeteksteditor.utils;

import no.nav.sbl.ledeteksteditor.domain.Applikasjon;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.utils.exception.*;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.InvalidRemoteException;
import org.eclipse.jgit.api.errors.TransportException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.RepositoryCache;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.transport.CredentialsProvider;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.util.FS;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.lang.System.getProperty;
import static no.nav.sbl.ledeteksteditor.utils.FunctionalUtils.not;

public class GitWrapper {

    public static final UsernamePasswordCredentialsProvider CREDENTIALS_PROVIDER = new UsernamePasswordCredentialsProvider(getProperty("git.credential.username", ""), getProperty("git.credential" +
            ".password", ""));

    static {
        CredentialsProvider.setDefault(CREDENTIALS_PROVIDER);
    }

    public static Repository getRepo(Applikasjon applikasjon, File fileDir) {
        return getRepo(applikasjon, fileDir, true);
    }

    public static Repository getRepo(File fileDir) {
        return getRepo(null, fileDir, false);
    }

    public static Repository getRepo(Applikasjon applikasjon, File fileDir, boolean pullEtterAapnet) {
        Git testResult;
        try {
            if (isLegalRepo(fileDir.toPath())) {
                testResult = Git.open(fileDir);
                if (pullEtterAapnet) {
                    pull(testResult.getRepository());
                }
            } else {
                testResult = Git.cloneRepository()
                        .setURI(applikasjon.url)
                        .setBranch(applikasjon.defaultBranch)
                        .setDirectory(fileDir)
                        .call();
            }
        } catch (InvalidRemoteException e) {
            throw new RemoteIkkeFunnetException(e);
        } catch (GitAPIException e) {
            throw new GitWrapperException(e);
        } catch (IOException e) {
            throw new AapneRepoException(e);
        }
        return testResult.getRepository();
    }

    public static List<File> listFiles(Repository repo) {
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        try {
            RevCommit commit = walk.parseCommit(repo.exactRef("HEAD").getObjectId());
            treeWalk.addTree(commit.getTree());
        } catch (IOException e) {
            throw new AapneRepoException(e);
        }
        treeWalk.setRecursive(true);

        List<File> files = new ArrayList<>();
        try {
            while (treeWalk.next()) {
                File file = new File(repo.getWorkTree(), treeWalk.getPathString());
                files.add(file);
            }
        } catch (IOException e) {
            throw new AapneRepoException(e);
        }
        return files;
    }

    public static String getContentFromFile(File file) {
        List<String> content;
        try {
            content = Files.readAllLines(file.toPath());
        } catch (IOException e) {
            throw new LesLedetekstException(e);
        }
        return String.join("\n", content);
    }

    public static void writeContentToFile(File file, String content) {
        try {
            Files.write(file.toPath(), content.getBytes());
        } catch (IOException e) {
            throw new SkrivLedetekstException(e);
        }
    }

    private static boolean isLegalRepo(Path path) {
        return RepositoryCache.FileKey.isGitRepository(path.resolve(".git").toFile(), FS.DETECTED);
    }

    public static void commitChanges(Repository repo, Ident ident, Optional<String> kommentarMaybe) {
        Git git = new Git(repo);
        try {
            String kommentar = kommentarMaybe.filter(not(String::isEmpty)).orElse("Endret via ledeteksteditor");
            git.add().addFilepattern(".").call();
            git.commit().setMessage(kommentar).setAuthor(ident.navn, ident.epost).call();
        } catch (TransportException e) {
            throw new AutentiseringException(e);
        } catch (GitAPIException e) {
            throw new ApplikasjonsException(e);
        }
    }

    public static void push(Repository repo) {
        Git git = new Git(repo);
        try {
            git.push().call();
        } catch (GitAPIException e) {
            throw new ApplikasjonsException(e);
        }
    }

    public static void pull(Repository repo) {
        Git git = new Git(repo);
        try {
            git.pull().call();
        } catch (GitAPIException e) {
            throw new ApplikasjonsException(e);
        }
    }

    public static void initAndCommitRepo(File fileDir) {
        try {
            Git.init().setDirectory(fileDir).call();
            Git repo = Git.open(fileDir);
            repo.commit().setMessage("init").setAuthor("GitWrapper", "Git@Wrapper.no");
        } catch (GitAPIException e) {
            throw new ApplikasjonsException(e);
        } catch (IOException e) {
            throw new ApplikasjonsException(e);
        }
    }
}
