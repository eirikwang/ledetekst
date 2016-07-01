package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.FileUtils;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LedetekstServiceImpl implements LedetekstService {
    private static final String stashBaseUrl = System.getProperty("stash.baseUrl", "http://stash.devillo.no");
    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>() {{
        put("ledertekst-temp", stashBaseUrl + "/scm/hack/ledertekst-temp.git");
    }};

    @Override
    public List<Ledetekst> hentAlleLedeteksterFor(String remoteUrl, File fileDir) {
        List<File> filer = hentAlleLedetekstFilerFor(remoteUrl, fileDir);
        return mapTilLedetekst(filer);
    }

    @Override
    public List<File> hentAlleLedetekstFilerFor(String remoteUrl, File fileDir) {
        Repository repo = GitWrapper.getRepo(remoteUrl, fileDir);
        List<File> filer = GitWrapper.listFiles(repo);
        repo.close();
        return filer.stream().filter(FileUtils.erLedetekstFil()).collect(Collectors.toList());
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {

            if(!FileUtils.matcherFilMonster(file)){
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
    public Ledetekst hentLedeteksteFor(String remoteUrl, File fileDir, String ledetekstnokkel) {
        List<Ledetekst> ledetekster = hentAlleLedeteksterFor(remoteUrl, fileDir);
        Ledetekst ledetekst = null;
        for (Ledetekst l : ledetekster) {
            if(l.nokkel.equals(ledetekstnokkel)){
                ledetekst = l;
                break;
            }
        }
        if(ledetekst == null){
            throw new IkkeFunnetException("Fant ikke ledetekst");
        }
        return ledetekst;
    }

    @Override
    public Ledetekst oppdaterLedeteksteFor(String remoteUrl, File fileDir, Ledetekst ledetekst, Ident ident) {
        List<File> filer = hentAlleLedetekstFilerFor(remoteUrl, fileDir);
        boolean nyeEndringer = false;
        for( Map.Entry<String, String> spraak : ledetekst.spraak.entrySet()){
            nyeEndringer |= oppdaterLedetekstForHjelper(filer, ledetekst.nokkel, spraak);
        }
        Repository repo = GitWrapper.getRepo(remoteUrl, fileDir);
        if (nyeEndringer){
            GitWrapper.commitChanges(repo, ident, ledetekst.kommentar);
            GitWrapper.push(repo);
        }
        repo.close();
        return hentLedeteksteFor(remoteUrl, fileDir, ledetekst.nokkel);
    }

    private boolean oppdaterLedetekstForHjelper(List<File> filer, String ledetekstnokkel, Map.Entry<String, String> spraak){
        File ledetekstfil = null;
        for(File fil : filer){
            if(fil.getName().contains(ledetekstnokkel + "_" + spraak.getKey())){
                ledetekstfil = fil;
                break;
            }
        }
        if(ledetekstfil == null){
            throw new IkkeFunnetException("Fant ikke fil: " + ledetekstnokkel + "_" + spraak.getKey());
        }
        boolean endretFil = false;
        if(!GitWrapper.getContentFromFile(ledetekstfil).equals(spraak.getValue())){
            GitWrapper.writeContentToFile(ledetekstfil, spraak.getValue());
            endretFil = true;
        }
        return endretFil;
    }
}
