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

    public void hentApplikasjon() throws GitAPIException {
        Git git = Git.cloneRepository()
                .setURI("ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git")
                //.setDirectory("")
                .call();
    }

    /**
     * Henter applikasjonsledefelter fra repo, lokalt
     *
     * @return ledetekster fra et repo/applikasjon
     * @throws IOException
     */
    private ArrayList<Ledetekst> hentApplikasjonsFelter() throws IOException {

        Repository repo = new FileRepositoryBuilder().setGitDir(new File("C:\\Users\\O148212\\Documents\\projects\\veiledningarbeidssoker/.git")).build();
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        RevCommit commit = walk.parseCommit(repo.getRef("HEAD").getObjectId());
        treeWalk.addTree(commit.getTree());
        treeWalk.setRecursive(true);

        ArrayList<Ledetekst> ledetekster = new ArrayList<>();

        Object[] ledetekstNokkler = hentLedetekstNokklerMedFilsti(treeWalk);

        for (Object ledetekstNokkel : ledetekstNokkler) {
            System.out.println(ledetekstNokkel);
            treeWalk.reset();
            treeWalk.addTree(commit.getTree());
            treeWalk.setRecursive(true);
            treeWalk.setFilter(
                    PathFilter.create(
                            hentFilstiFraLedetekstNokkel((String) ledetekstNokkel)));

            HashMap<String, String> innhold = new HashMap<>();
            while (treeWalk.next()) {
                innhold.putAll(hentInnhold(treeWalk, repo));
            }
            ledetekster.add(new Ledetekst((String) ledetekstNokkel, innhold));
        }
        return ledetekster;
    }

    /**
     * Leser innholdet i filen
     *
     * @param treeWalk  interering av treet
     * @param repo  repoet som blir lest
     * @return innhold i en ledetekst for hvert språk
     * @throws IOException
     */
    private HashMap<String, String> hentInnhold(TreeWalk treeWalk, Repository repo) throws IOException {
        HashMap<String, String> innhold = new HashMap<>();

        String filsti = treeWalk.getPathString();
        System.out.println(filsti);
        ObjectId objectId = treeWalk.getObjectId(0);

        try {
            ObjectLoader objektLaster = repo.open(objectId);
            try (InputStream stream = objektLaster.openStream();
                 BufferedReader buff = new BufferedReader(new InputStreamReader(stream))) {
                String spraakInnhold = buff.readLine();
                String spraak = hentSpraakFraFilsti(filsti);
                innhold.put(spraak, spraakInnhold);
            }
        } finally {
            repo.close();
        }
        return innhold;
    }

    /**
     * finner om det er _NO eller _EN osv i et filnavn
     *
     * @param filsti    filstien for ledetekst
     * @return språk for en ledetekst
     */
    private String hentSpraakFraFilsti(String filsti) {
        return filsti.substring(filsti.lastIndexOf("_") + 1, filsti.lastIndexOf("."));
    }

    /**
     * Henter filstien UTEN filnavn
     *
     * @param ledetekstNokkel   hele filstien
     * @return filsti for ledetekst
     */
    private String hentFilstiFraLedetekstNokkel(String ledetekstNokkel) {
        return ledetekstNokkel.substring(0, ledetekstNokkel.lastIndexOf("/"));
    }

    /**
     * Henter hele filstien (med filnavn) uten språk (_NO og _EN)
     *
     * @param treeWalk  itereringen av treet
     * @return alle filstier med filnavn uten språk
     * @throws IOException
     */
    private Object[] hentLedetekstNokklerMedFilsti(TreeWalk treeWalk) throws IOException {
        HashMap<String, String> ledetekstNokklerMedFilsti = new HashMap<>();
        while (treeWalk.next()) {
            String filsti = treeWalk.getPathString();
            if (filsti.contains(FIELD_PATH)) {
                String filstiUtenSpraak = hentFilstiUtenSpraak(filsti);
                ledetekstNokklerMedFilsti.put(filstiUtenSpraak, filstiUtenSpraak);
            }
        }
        return ledetekstNokklerMedFilsti.values().toArray();
    }

    /**
     * Metoden over bruker den her, henter filnavn uten språk
     *
     * @param filsti    filstien
     * @return filsti med filnavn uten språk for én fil
     */
    private String hentFilstiUtenSpraak(String filsti) {
        int sisteUnderstrekIFilsti = filsti.lastIndexOf("_");
        return filsti.substring(0, sisteUnderstrekIFilsti);
    }

    public static void main(String[] args) throws IOException {
        JGitWrapper jgit = new JGitWrapper();

        ArrayList<Ledetekst> ledetekster = jgit.hentApplikasjonsFelter();

        for (Ledetekst s : ledetekster) {
            System.out.println(s.hentInnhold());
        }
    }
}
