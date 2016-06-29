package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.FileUtils;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class LedetekstServiceImpl implements LedetekstService {

    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>() {{
        put("ledertekst-temp", "http://S148209@stash.devillo.no/scm/hack/ledertekst-temp.git");
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
        return filer.stream().filter(FileUtils.erLedetekstFil()).collect(Collectors.toList());
    }

    @Override
    public List<File> hentAlleLedetekstFilerFor(String remoteUrl, File fileDir, String ledetekstnokkel) {
        List<File> filer = hentAlleLedetekstFilerFor(remoteUrl, fileDir);
        List<File> ledetekstFiler = new ArrayList<File>();
        Pattern ledtekstPattern = Pattern.compile(ledetekstnokkel);
        for( File ledetekstFil : ledetekstFiler){
            Matcher matcher = ledtekstPattern.matcher(ledetekstFil.getName());
            if(matcher.find()){
                filer.add(ledetekstFil);
            }
        }
        return ledetekstFiler;
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {

            if(!FileUtils.matcherFilMonster(file)) continue;
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
        for( Map.Entry<String, String> spraak : ledetekst.spraak.entrySet()){
            oppdaterLedetekstFor(filer, ledetekst.nokkel, spraak);
        }
        Repository repo = GitWrapper.getRepo(remoteUrl, fileDir);
        GitWrapper.commitChanges(repo, ident, ledetekst.kommentar);
        return hentLedeteksteFor(remoteUrl, fileDir, ledetekst.nokkel);
    }

    private void oppdaterLedetekstFor(List<File> filer, String ledetekstnokkel, Map.Entry<String, String> spraak){
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
        GitWrapper.writeContentToFile(ledetekstfil, spraak.getValue());
    }
}
