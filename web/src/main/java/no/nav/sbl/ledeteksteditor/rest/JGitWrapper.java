package no.nav.sbl.ledeteksteditor.rest;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.ObjectLoader;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.treewalk.filter.PathFilter;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;


public class JGitWrapper {

    private final static String FIELD_PATH = "tekster/src/main/resources/tekster/";

    public void klonApplikasjon() throws GitAPIException {

        try {
            Git git = Git.cloneRepository()
                    .setURI("ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git")
                    //.setDirectory("")
                    .call();
        }
    }

    private ArrayList<Ledetekst> hentApplikasjonsFelter() throws IOException {

        Repository repo = new FileRepositoryBuilder().setGitDir(new File("C:\\Users\\O148212\\Documents\\projects\\veiledningarbeidssoker/.git")).build();
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        RevCommit commit = walk.parseCommit(repo.getRef("HEAD").getObjectId());
        treeWalk.addTree(commit.getTree());
        treeWalk.setRecursive(true);

        ArrayList<Ledetekst> fields = new ArrayList<>();

        Object[] ledetekstNokkler = hentLedetekstNokklerMedFilsti(treeWalk);

        for( Object ledetekstNokkel: ledetekstNokkler){
            System.out.println(ledetekstNokkel);
            treeWalk.reset();
            treeWalk.addTree(commit.getTree());
            treeWalk.setRecursive(true);
            treeWalk.setFilter(
                    PathFilter.create(
                            hentFilstiFraLedetekstNokkel((String) ledetekstNokkel)));

            HashMap<String, String> innhold = new HashMap<>();
            while(treeWalk.next()){
                innhold.putAll(hentInnhold(treeWalk, repo));
            }
            fields.add(new Ledetekst((String)ledetekstNokkel, innhold));
        }
        return fields;
    }

    private HashMap<String, String> hentInnhold(TreeWalk treeWalk, Repository repo) throws IOException {
        HashMap<String, String> innhold = new HashMap<>();

        String filsti = treeWalk.getPathString();
        System.out.println(filsti);
        ObjectId objectId = treeWalk.getObjectId(0);

        try{
            ObjectLoader objektLaster = repo.open(objectId);
            try ( InputStream stream = objektLaster.openStream();
                  BufferedReader buff = new BufferedReader(new InputStreamReader(stream))) {
                String spraakInnhold = buff.readLine();
                String spraak = hentSpraakFraFilsti(filsti);
                innhold.put(spraak, spraakInnhold);
            }
        }finally {
            repo.close();
        }
        return innhold;
    }

    private String hentSpraakFraFilsti(String filsti) {
        return filsti.substring(filsti.lastIndexOf("_") + 1, filsti.lastIndexOf("."));
    }

    private String hentFilstiFraLedetekstNokkel(String ledetekstNokkel) {
        return ledetekstNokkel.substring(0, ledetekstNokkel.lastIndexOf("/"));
    }

    private Object[] hentLedetekstNokklerMedFilsti(TreeWalk treeWalk) throws IOException {
        HashMap<String, String> ledetekstNokklerMedFilsti = new HashMap<>();
        while(treeWalk.next()){
            String filsti = treeWalk.getPathString();
            if(filsti.contains(FIELD_PATH)){
                String filstiUtenSpraak = hentFilstiUtenSpraak(filsti);
                ledetekstNokklerMedFilsti.put(filstiUtenSpraak, filstiUtenSpraak);
            }
        }
        return ledetekstNokklerMedFilsti.values().toArray();
    }

    private String hentFilstiUtenSpraak(String filsti){
        int sisteUnderstrekIFilsti = filsti.lastIndexOf("_");
        return filsti.substring(0, sisteUnderstrekIFilsti);
    }

    public static void main(String[] args) throws IOException {
        JGitWrapper jgit = new JGitWrapper();

        ArrayList<Ledetekst> fields = jgit.hentApplikasjonsFelter();

        for (Ledetekst s : fields){
            System.out.println(s.hentInnhold());
        }
    }
}
