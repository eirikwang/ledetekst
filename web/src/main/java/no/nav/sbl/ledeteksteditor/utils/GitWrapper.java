package no.nav.sbl.ledeteksteditor.utils;

import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.utils.exception.*;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.InvalidRemoteException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.RepositoryCache;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.util.FS;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static java.lang.System.getProperty;

public class GitWrapper {

    public static Repository getRepo(String stashurl, File fileDir) {
        Git testResult;
        try {
            if (isLegalRepo(fileDir.toPath())) {
                testResult = Git.open(fileDir);
                testResult.pull().call();
            } else {
                testResult = Git.cloneRepository()
                        .setURI(stashurl)
                        .setDirectory(fileDir)
                        .setCredentialsProvider(new UsernamePasswordCredentialsProvider(getProperty("git.credential.username"), getProperty("git.credential.password")))
                        .call();
            }
        } catch (InvalidRemoteException e){
            throw new RemoteIkkeFunnetException(e);
        } catch (GitAPIException e){
            throw new GitWrapperException(e);
        } catch (IOException e){
            throw new AapneRepoException(e);
        }
        return testResult.getRepository();
    }

    public static List<File> listFiles(Repository repo) {
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        try {
            RevCommit commit = walk.parseCommit(repo.exactRef("HEAD").getObjectId()); //ToDo denne feiler om repo en peker til ikke er init
            treeWalk.addTree(commit.getTree());
        } catch (IOException e){
            throw new AapneRepoException(e);
        }
        treeWalk.setRecursive(true);

        List<File> files = new ArrayList<>();
        try {
            while (treeWalk.next()) {
                File file = new File(repo.getWorkTree(), treeWalk.getPathString());
                files.add(file);
            }
        } catch (IOException e){
            throw new AapneRepoException(e);
        }
        return files;
    }

    public static String getContentFromFile(File file) {
        List<String> content;
        try {
            content = Files.readAllLines(file.toPath()); //todo breakker på feil charset?
        } catch (IOException e){
            throw new LesLedetekstException(e);
        }
        return String.join("\n", content);
    }

    public static void writeContentToFile(File file, String content){
        try {
            Files.write(file.toPath(), content.getBytes());
        } catch (IOException e){
            throw new SkrivLedetekstException(e);
        }
    }

    private static boolean isLegalRepo(Path path) {
        return RepositoryCache.FileKey.isGitRepository(path.resolve(".git").toFile(), FS.DETECTED);
    }

    public static void commitChanges(Repository repo, Ident ident, String kommentar) {
        Git git = new Git(repo);
        try {
            git.add().addFilepattern(".").call();
            git.commit().setMessage(kommentar).setAuthor(ident.navn, ident.epost).call();
            git.push().call();
        } catch (GitAPIException e) {
            throw new ApplikasjonsException(e);
        }
    }
}
