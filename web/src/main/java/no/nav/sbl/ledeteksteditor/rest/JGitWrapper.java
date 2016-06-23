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
import java.util.Iterator;
import java.util.Map;


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
    private ArrayList<Ledetekst> hentApplikasjonsLedetekster() throws IOException {

        Repository repo = new FileRepositoryBuilder()
                .setGitDir(new File("C:\\Users\\O148212\\Documents\\projects\\veiledningarbeidssoker/.git"))
                .build();
        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        RevCommit commit = walk.parseCommit(repo.exactRef("HEAD").getObjectId());
        treeWalk.addTree(commit.getTree());
        treeWalk.setRecursive(true);

        ArrayList<Ledetekst> ledetekster = new ArrayList<>();

        Map ledetekstNokkler = hentLedetekstNokkler(treeWalk);

        for (Object entry : ledetekstNokkler.keySet()){
            String ledetekstNokkel = (String) entry;
            String filsti = (String) ledetekstNokkler.get(entry);

            System.out.println(ledetekstNokkel);

            treeWalk.reset();
            treeWalk.addTree(commit.getTree());
            treeWalk.setRecursive(true);
            treeWalk.setFilter(PathFilter.create(filsti));

            Map<String, String> innhold = new HashMap<>();
            while (treeWalk.next()) {
                innhold.putAll(hentInnhold(treeWalk, repo));
            }
            ledetekster.add(new Ledetekst(ledetekstNokkel, innhold));
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
    private Map<String, String> hentInnhold(TreeWalk treeWalk, Repository repo) throws IOException {
        HashMap<String, String> innhold = new HashMap<>();

        String filsti = treeWalk.getPathString();
        //System.out.println(filsti);
        ObjectId objectId = treeWalk.getObjectId(0);

        try {
            ObjectLoader objektLaster = repo.open(objectId);
            try (InputStream stream = objektLaster.openStream();
                 BufferedReader buff = new BufferedReader(new InputStreamReader(stream))) {
                String spraakInnhold = buff.readLine();
                String spraak = hentSpraak(filsti);
                innhold.put(spraak, spraakInnhold);
            }
        } finally {
            repo.close();
        }
        return innhold;
    }

    /**
     * Henter hele filstien (med filnavn) uten språk (_no og _en)
     *
     * @param treeWalk  itereringen av treet
     * @return alle filstier med filnavn uten språk
     * @throws IOException
     */
    private Map hentLedetekstNokkler(TreeWalk treeWalk) throws IOException {
        Map<String, String> ledetekstNokkler = new HashMap<>();
        while (treeWalk.next()) {
            String filsti = treeWalk.getPathString();
            String filnavn = treeWalk.getNameString();
            if (filsti.contains(FIELD_PATH)) {
                String ledetekstNokkel = hentLedetekstNokkelFraFilnavn(filnavn);
                ledetekstNokkler.put(ledetekstNokkel, hentFilsti(filsti));
            }
        }
        return ledetekstNokkler;
    }

    /**
     * Metoden over bruker den her, henter filnavn uten språk
     *
     * @param filnavn    filstien
     * @return filnavn med filnavn uten språk for én fil
     */
    private String hentLedetekstNokkelFraFilnavn(String filnavn) {
        int sisteUnderstrek = filnavn.lastIndexOf("_");
        return filnavn.substring(0, sisteUnderstrek);
    }

    /**
     * finner om det er _NO eller _EN osv i et filnavn
     *
     * @param filsti    filstien for ledetekst
     * @return språk for en ledetekst
     */
    private String hentSpraak(String filsti) {
        return filsti.substring(filsti.lastIndexOf("_") + 1, filsti.lastIndexOf("."));
    }

    /**
     * Henter filstien UTEN filnavn
     *
     * @param ledetekstNokkel   hele filstien
     * @return filsti for ledetekst
     */
    private String hentFilsti(String ledetekstNokkel) {
        return ledetekstNokkel.substring(0, ledetekstNokkel.lastIndexOf("/"));
    }


    public static void main(String[] args) throws IOException {
        JGitWrapper jgit = new JGitWrapper();

        ArrayList<Ledetekst> ledetekster = jgit.hentApplikasjonsLedetekster();

        for (Ledetekst s : ledetekster) {
            System.out.print(s.hentNavn() + " ");
            System.out.println(s.hentInnhold());
        }
    }


}
