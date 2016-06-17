package no.nav.sbl.ledeteksteditor.rest;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.treewalk.TreeWalk;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;


public class JGitWrapper {

    private final static String FIELD_PATH = "tekster/src/main/resources/tekster/";

    public void retrieveApplications() throws GitAPIException {
        Git git = Git.cloneRepository()
                .setURI("ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git")
                //.setDirectory("")
                .call();



    }

    private ArrayList<String> getApplicationFields() throws IOException {

        Repository repo = new FileRepositoryBuilder().setGitDir(new File("C:\\Users\\O148212\\Documents\\projects\\veiledningarbeidssoker/.git")).build();
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        RevCommit commit = walk.parseCommit(repo.getRef("HEAD").getObjectId());
        treeWalk.addTree(commit.getTree());

        treeWalk.setRecursive(true);


        ArrayList<String> fields = new ArrayList<>();


        while(treeWalk.next()){
            String path = treeWalk.getPathString();
            String fieldName = treeWalk.getNameString();
            //.out.println(path + fieldName);

            if(path.contains(FIELD_PATH)){
                fields.add(fieldName);
            }
        }
        return fields;
    }


    public static void main(String[] args) throws IOException {
        JGitWrapper jgit = new JGitWrapper();

        ArrayList<String> fields = jgit.getApplicationFields();

        for (String s : fields){
            System.out.println(s);
        }
    }
}
