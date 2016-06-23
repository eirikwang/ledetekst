package no.nav.sbl.ledeteksteditor.utils;

import org.eclipse.jgit.api.CreateBranchCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.RepositoryCache;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.util.FS;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class GitWrapper {

    public static Repository getRepo(String stashurl, File fileDir) throws GitAPIException, IOException {
        Git testResult;

        String path = fileDir.getPath() + "/.git";
        if (RepositoryCache.FileKey.isGitRepository(new File(path), FS.DETECTED)) {
            testResult = Git.open(fileDir);
        } else {
            testResult = Git.cloneRepository()
                    .setURI(stashurl)
                    .setDirectory(fileDir)
                    .call();

            testResult.checkout()
                    .setCreateBranch(true)
                    .setName("tekstendepunkt")
                    .setUpstreamMode(CreateBranchCommand.SetupUpstreamMode.TRACK)
                    .setStartPoint("origin/tekstendepunkt")
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
            File file = new File(treeWalk.getPathString());
            files.add(file);
        }

        return files;
    }

    public static String getContentFromFile(File file) throws IOException {
        final String path = "../repo/veiledningarbeidssoker/";
        List<String> content = Files.readAllLines(Paths.get(path + file.getPath()));
        return String.join("\n", content);

    }
}
