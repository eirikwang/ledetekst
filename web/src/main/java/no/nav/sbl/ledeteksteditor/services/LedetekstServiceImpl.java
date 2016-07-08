package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Applikasjon;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.FileUtils;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.lang.System.getProperty;

public class LedetekstServiceImpl implements LedetekstService {
    private static final String stashBaseUrl = getProperty("stash.url");
    public static final Map<String, Applikasjon> REPOSITORIES =
            Arrays.asList(
                    new Applikasjon("ledetekst-temp", "Temp applikasjon for å teste ledetekst-editor", stashBaseUrl + "/scm/hack/ledertekst-temp.git"),
                    new Applikasjon("veiledningarbeidssoker", "Veiledning arbeidssoker", stashBaseUrl + "/scm/sbl/veiledningarbeidssoker.git", "tekster")
            ).stream().collect(Collectors.toMap(Applikasjon::getId, Function.identity()));

    @Override
    public List<Ledetekst> hentAlleLedeteksterFor(Applikasjon applikasjon, File fileDir) {
        List<File> filer = hentAlleLedetekstFilerFor(applikasjon, fileDir);
        return mapTilLedetekst(filer);
    }

    @Override
    public List<File> hentAlleLedetekstFilerFor(Applikasjon applikasjon, File fileDir) {
        Repository repo = GitWrapper.getRepo(applikasjon, fileDir);
        List<File> filer = GitWrapper.listFiles(repo);
        repo.close();
        return filer.stream().filter(FileUtils.erLedetekstFil()).collect(Collectors.toList());
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {

            if (!FileUtils.matcherFilMonster(file)) {
                continue;
            }
            String nokkel = FileUtils.hentNokkel(file);
            String locale = FileUtils.hentLocale(file);
            String innholdFil = GitWrapper.getContentFromFile(file);
            innhold.computeIfAbsent(nokkel, (ignore) -> new HashMap<>()).put(locale, innholdFil);
        }
        return innhold.entrySet().stream().map(entry -> new Ledetekst(entry.getKey(), entry.getValue())).collect(Collectors.toList());
    }

    @Override
    public Ledetekst hentLedeteksteFor(Applikasjon applikasjon, File fileDir, String ledetekstnokkel) {
        List<Ledetekst> ledetekster = hentAlleLedeteksterFor(applikasjon, fileDir);
        Ledetekst ledetekst = null;
        for (Ledetekst l : ledetekster) {
            if (l.nokkel.equals(ledetekstnokkel)) {
                ledetekst = l;
                break;
            }
        }
        if (ledetekst == null) {
            throw new IkkeFunnetException("Fant ikke ledetekst");
        }
        return ledetekst;
    }

    @Override
    public Ledetekst oppdaterLedeteksteFor(Applikasjon applikasjon, File fileDir, Ledetekst ledetekst, Ident ident) {
        List<File> filer = hentAlleLedetekstFilerFor(applikasjon, fileDir);
        boolean nyeEndringer = false;
        for (Map.Entry<String, String> spraak : ledetekst.spraak.entrySet()) {
            nyeEndringer |= oppdaterLedetekstForHjelper(filer, ledetekst.nokkel, spraak);
        }
        Repository repo = GitWrapper.getRepo(applikasjon, fileDir);
        if (nyeEndringer) {
            GitWrapper.commitChanges(repo, ident, ledetekst.kommentar);
            GitWrapper.push(repo);
        }
        repo.close();
        return hentLedeteksteFor(applikasjon, fileDir, ledetekst.nokkel);
    }

    private boolean oppdaterLedetekstForHjelper(List<File> filer, String ledetekstnokkel, Map.Entry<String, String> spraak) {
        File ledetekstfil = null;
        for (File fil : filer) {
            if (fil.getName().contains(ledetekstnokkel + "_" + spraak.getKey())) {
                ledetekstfil = fil;
                break;
            }
        }
        if (ledetekstfil == null) {
            throw new IkkeFunnetException("Fant ikke fil: " + ledetekstnokkel + "_" + spraak.getKey());
        }
        boolean endretFil = false;
        if (!GitWrapper.getContentFromFile(ledetekstfil).equals(spraak.getValue())) {
            GitWrapper.writeContentToFile(ledetekstfil, spraak.getValue());
            endretFil = true;
        }
        return endretFil;
    }
}
