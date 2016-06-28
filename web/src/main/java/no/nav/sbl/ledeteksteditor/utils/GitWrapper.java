package no.nav.sbl.ledeteksteditor.utils;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
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

    public static Repository getRepo(String stashurl, File fileDir) throws GitAPIException, IOException {
        Git testResult;

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
        return testResult.getRepository();
    }

    public static List<File> listFiles(Repository repo) throws IOException {
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        RevCommit commit = walk.parseCommit(repo.exactRef("HEAD").getObjectId());
        treeWalk.addTree(commit.getTree());
        treeWalk.setRecursive(true);

        List<File> files = new ArrayList<>();

        while (treeWalk.next()) {
            File file = new File(repo.getWorkTree(), treeWalk.getPathString());
            files.add(file);
        }

        return files;
    }

    public static String getContentFromFile(File file) throws IOException {
        List<String> content = Files.readAllLines(file.toPath());
        return String.join("\n", content);

    }

    private static boolean isLegalRepo(Path path) {
        return RepositoryCache.FileKey.isGitRepository(path.resolve(".git").toFile(), FS.DETECTED);
    }

}
