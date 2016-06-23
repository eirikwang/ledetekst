package no.nav.sbl.ledeteksteditor.rest;

import org.eclipse.jgit.api.CreateBranchCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.JGitInternalException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.RepositoryCache;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.treewalk.filter.PathFilter;
import org.eclipse.jgit.util.FS;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class JGitWrapper {

    private static final Pattern regex = Pattern.compile("(.*?)(_([a-zA-Z]{2}_?[a-zA-Z]{0,2}))?\\.([a-z]*)$");
    private final static String FIELD_PATH = "tekster/src/main/tekster";
    private final String testerPath = "../repo/veiledningarbeidssoker/";
    private File kloneTestDir = new File(testerPath);

    /**
     *   Metode for å klone et git repository ned
     *   i en (per nå) testmappe.
     */
    public void cloneRepository() throws GitAPIException, IOException {
        Git testResult;

        if (RepositoryCache.FileKey.isGitRepository(new File("../repo/veiledningarbeidssoker/.git"), FS.DETECTED)) {
            testResult = Git.open(kloneTestDir);
        } else {
            testResult = Git.cloneRepository()
                    .setURI("ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git")
                    .setDirectory(kloneTestDir)
                    .call();

            testResult.checkout()
                    .setCreateBranch(true)
                    .setName("tekstendepunkt")
                    .setUpstreamMode(CreateBranchCommand.SetupUpstreamMode.TRACK)
                    .setStartPoint("origin/tekstendepunkt")
                    .call();
        }

        System.out.println("Repository: " + testResult.getRepository().getDirectory());
    }

    /**
     * Henter applikasjonsledefelter fra repo, lokalt
     *
     * @return ledetekster fra et repo/applikasjon
     * @throws IOException
     */
    private ArrayList<Ledetekst> hentApplikasjonsLedetekster() throws IOException, GitAPIException {
        Repository repo = new FileRepositoryBuilder()
                .setGitDir(new File(kloneTestDir + "/.git"))
                .build();

        System.out.println(repo.getBranch());


        TreeWalk treeWalk = new TreeWalk(repo);
        RevWalk walk = new RevWalk(repo);
        RevCommit commit = walk.parseCommit(repo.exactRef("HEAD").getObjectId());
        treeWalk.addTree(commit.getTree());
        treeWalk.setRecursive(true);

        ArrayList<Ledetekst> ledetekster = new ArrayList<>();

        Map<String, String> ledetekstNokkler = hentLedetekstNokkler(treeWalk);

        for (Map.Entry<String, String> entry : ledetekstNokkler.entrySet()){
            String ledetekstNokkel = entry.getKey();
            String filsti = entry.getValue();

            treeWalk.reset();
            treeWalk.addTree(commit.getTree());
            treeWalk.setRecursive(true);
            treeWalk.setFilter(PathFilter.create(filsti));

            Map<String, String> innhold = new HashMap<>();
            while (treeWalk.next()) {
                innhold.putAll(hentInnhold(treeWalk));
            }
            ledetekster.add(new Ledetekst(ledetekstNokkel, innhold));
        }
        return ledetekster;
    }

    /**
     * Leser innholdet i filen
     *
     * @param treeWalk  interering av treet
     * @return innhold i en ledetekst for hvert språk
     * @throws IOException
     */
    private Map<String, String> hentInnhold(TreeWalk treeWalk) throws IOException {
        HashMap<String, String> innhold = new HashMap<>();
        String filsti = testerPath + treeWalk.getPathString();
        String spraak = "";
        Matcher matcher = regex.matcher(filsti);
        if(matcher.find()) {
            spraak = filsti.substring(filsti.lastIndexOf(matcher.group(3)), filsti.lastIndexOf("."));
        }

        List<String> innholdListe = Files.readAllLines(Paths.get(filsti));
        String innholdFil = String.join("\n", innholdListe);
        innhold.put(spraak, innholdFil);

        return innhold;
    }

    /**
     * Henter hele filstien (med filnavn) uten språk (_no og _en)
     *
     * @param treeWalk  itereringen av treet
     * @return alle filstier med filnavn uten språk
     * @throws IOException
     */
    private Map<String, String> hentLedetekstNokkler(TreeWalk treeWalk) throws IOException {
        Map<String, String> ledetekstNokkler = new HashMap<>();
        while (treeWalk.next()) {
            String filsti = treeWalk.getPathString();
            String filnavn = treeWalk.getNameString();

            if (filsti.contains(FIELD_PATH)) {
                Matcher matcher = regex.matcher(filnavn);
                String ledetekstNokkel = "";
                if (matcher.find()) {
                    ledetekstNokkel = matcher.group(1);
                }
                ledetekstNokkler.put(ledetekstNokkel, hentFilsti(filsti));
            }
        }

        return ledetekstNokkler;
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

    public static void main(String[] args) throws IOException, GitAPIException {
        JGitWrapper jgit = new JGitWrapper();

        jgit.cloneRepository();

        ArrayList<Ledetekst> ledetekster = jgit.hentApplikasjonsLedetekster();

        for (Ledetekst s : ledetekster) {
            System.out.print(s.hentNavn() + " ");
            System.out.println(s.hentInnhold());
        }
        System.out.println(jgit.kloneTestDir.getAbsolutePath());
    }

}
